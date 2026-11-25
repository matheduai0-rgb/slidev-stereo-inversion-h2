<script setup lang="ts">
// Slide "Bayangan Circline Ortogonal Sumbu-x di Bawah I_{C_{q,r}}": the four cases.
// Γ ⊥ x-axis (circle centred on the axis, or a vertical line). The image is drawn from the
// slide's FORMULAS (s := a − q₀); the readout checks them against pointwise inversion invC.
import { computed, ref, watch } from 'vue'
import { type V2 } from './lib/geom'
import { invC } from './lib/hyp'
import { COL, dragPoint, fnPoint, pcurve, shadeH2, useBoard, usePlayer, GGB2D } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '260px' } })
const el = ref<HTMLElement | null>(null)

const q0 = ref(1)
const r = ref(1)
const a = ref(2.8)
const rho = ref(1.2)
const vert = ref(false) // Γ is the vertical line x = a
const tp = ref(0.3) // position of the test point p on Γ
const playing = ref(false)

type Img = { kind: 'c'; c: number; R: number } | { kind: 'v'; x: number }
const s = computed(() => a.value - q0.value)
const TOL = 1e-12

/** Case number 1–4 per the slide. */
const kase = computed(() => {
  if (vert.value) return Math.abs(s.value) < TOL ? 4 : 3
  return Math.abs(s.value * s.value - rho.value * rho.value) < TOL * Math.max(1, rho.value * rho.value) ? 2 : 1
})
/** Image of Γ from the slide's formulas. */
const image = computed<Img>(() => {
  const Q = q0.value, R2 = r.value * r.value, S = s.value
  switch (kase.value) {
    case 1: { const D = S * S - rho.value * rho.value; return { kind: 'c', c: Q + (R2 * S) / D, R: (R2 * rho.value) / Math.abs(D) } }
    case 2: return { kind: 'v', x: Q + R2 / (2 * S) }
    case 3: return { kind: 'c', c: Q + R2 / (2 * S), R: R2 / (2 * Math.abs(S)) }
    default: return { kind: 'v', x: Q }
  }
})

/** Circle sampled densely near the point closest to the view centre, so huge circles still render. */
function circlePts(c: number, R: number, n = 700): V2[] {
  const th0 = Math.atan2(0.8, 2 - c) // direction from centre toward the view centre ≈ (2, 0.8)
  const pts: V2[] = []
  for (let i = 0; i <= n; i++) {
    const u = -1 + (2 * i) / n, th = th0 + Math.PI * Math.sign(u) * Math.abs(u) ** 3
    pts.push([c + R * Math.cos(th), R * Math.sin(th)])
  }
  return pts
}
const vline = (x: number): V2[] => Array.from({ length: 201 }, (_, i) => [x, -40 + (80 * i) / 200] as V2)
const imgPts = (): V2[] => (image.value.kind === 'c' ? circlePts(image.value.c, image.value.R) : vline(image.value.x))
const gammaPts = (): V2[] => (vert.value ? vline(a.value) : circlePts(a.value, rho.value))

/** Test point p on Γ (parameter in (0,1)); avoids q itself. */
function pOn(t: number): V2 {
  if (vert.value) return [a.value, 2.2 * Math.tan(Math.PI * (t - 0.5) * 0.92)]
  const th = 2 * Math.PI * t
  return [a.value + rho.value * Math.cos(th), rho.value * Math.sin(th)]
}
const P = () => pOn(tp.value)
const IP = () => invC(q0.value, r.value)(P())

/** max distance of invC(Γ samples) from the formula image (relative for big circles). */
const residual = computed(() => {
  const f = invC(q0.value, r.value), img = image.value
  let m = 0
  for (let k = 0; k < 64; k++) {
    const p = pOn((k + 0.5) / 64), w = f(p)
    if (!Number.isFinite(w[0]) || Math.hypot(p[0] - q0.value, p[1]) < 1e-6) continue
    const e = img.kind === 'v' ? Math.abs(w[0] - img.x) : Math.abs(Math.hypot(w[0] - img.c, w[1]) - img.R) / Math.max(1, img.R)
    m = Math.max(m, e)
  }
  return m
})

let qP: any, aP: any
const B = useBoard(el, [-1.6, 2.6, 6.2, -1.6], GGB2D, (board) => {
  shadeH2(board)
  pcurve(board, () => circlePts(q0.value, r.value, 240), { strokeColor: COL.coral, strokeWidth: 1.8, dash: 2 })
  pcurve(board, gammaPts, { strokeColor: COL.purple, strokeWidth: 2.4 })
  pcurve(board, imgPts, { strokeColor: COL.blue, strokeWidth: 2.8 })
  // ray from q through p to I_C(p): the inverse lies on it
  pcurve(board, () => { const p = P(), w = IP(); return Number.isFinite(w[0]) ? [[q0.value, 0], p, w] : [] }, { strokeColor: COL.dim, strokeWidth: 1, dash: 1 })
  fnPoint(board, P, 'p', COL.purple, 3)
  fnPoint(board, IP, 'I_C(p)', COL.blue, 3)
  qP = dragPoint(board, [q0.value, 0], 'q')
  aP = dragPoint(board, [a.value, 0], 'a')
  qP.on('drag', () => { qP.moveTo([qP.X(), 0]); q0.value = qP.X() })
  aP.on('drag', () => { aP.moveTo([aP.X(), 0]); a.value = aP.X() })
  board.update()
})
watch([q0, r, a, rho, vert, tp], () => {
  if (qP && Math.abs(qP.X() - q0.value) > 1e-15) qP.moveTo([q0.value, 0])
  if (aP && Math.abs(aP.X() - a.value) > 1e-15) aP.moveTo([a.value, 0])
  B.update()
})

// ▶ sweep ρ through |s|: the image circle blows up into the vertical line (case 2) and comes back.
const player = usePlayer((t) => {
  vert.value = false
  const S = Math.abs(s.value) || 1
  rho.value = Math.max(0.1, S * (1 + 0.75 * Math.sin(0.55 * t)))
})

function snap(k: number | 'lemma') {
  if (playing.value) playing.value = player.toggle()
  if (k === 'lemma') { q0.value = 1; r.value = 1; a.value = 2; rho.value = 1; vert.value = false; tp.value = 0.25; return }
  if (k === 1) { vert.value = false; a.value = q0.value + 1.8; rho.value = 1.2 }
  if (k === 2) { vert.value = false; if (Math.abs(s.value) < 0.2) a.value = q0.value + 1.2; rho.value = Math.abs(s.value) }
  if (k === 3) { vert.value = true; if (Math.abs(s.value) < 0.2) a.value = q0.value + 1.2 }
  if (k === 4) { vert.value = true; a.value = q0.value }
}

const f4 = (x: number) => (Math.abs(x) < 5e-13 ? '0' : Number(x.toFixed(4)).toString())
const imgText = computed(() => {
  const g = image.value
  return g.kind === 'v' ? `garis x = ${f4(g.x)}` : `lingkaran pusat (${f4(g.c)}, 0), jari-jari ${f4(g.R)}`
})
const gammaText = computed(() => (vert.value ? `garis x = ${f4(a.value)}` : `(x − ${f4(a.value)})² + y² = ${f4(rho.value)}²`))
const ptText = computed(() => { const p = P(), w = IP(); return `p = (${f4(p[0])}, ${f4(p[1])}) ↦ I_C(p) = (${f4(w[0])}, ${f4(w[1])})` })
const KCOL = ['', COL.emerald, COL.amber, COL.blue, COL.purple]
defineExpose({ q0, r, a, rho, vert, tp, kase, image, residual, snap })
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" style="min-width: 5.6em" title="ρ menyapu melewati |s|" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶ ρ → |s|' }}</button>
      <span style="color: var(--fg-dim)">ρ</span><input v-model.number="rho" type="range" min="0.1" max="3.5" step="0.001" style="width: 90px" :disabled="vert" />
      <span style="color: var(--fg-dim)">r</span><input v-model.number="r" type="range" min="0.4" max="2.2" step="0.01" style="width: 70px" />
      <span style="color: var(--fg-dim)">titik p</span><input v-model.number="tp" type="range" min="0.01" max="0.99" step="0.001" style="width: 80px" />
      <label style="display: inline-flex; align-items: center; gap: 3px"><input v-model="vert" type="checkbox" />Γ garis vertikal</label>
    </div>
    <div class="jxg-controls">
      <button v-for="k in [1, 2, 3, 4]" :key="k" class="jxg-btn" :class="{ active: kase === k }" @click="snap(k)">Kasus {{ k }}</button>
      <button class="jxg-btn" @click="snap('lemma')">Contoh Lemma 4.8</button>
    </div>
    <div class="jxg-readout">
      <b :style="{ color: KCOL[kase] }">Kasus {{ kase }}</b> &nbsp;·&nbsp; s = a − q₀ = {{ f4(s) }} &nbsp;·&nbsp;
      <span :style="{ color: COL.purple }">Γ: {{ gammaText }}</span> &nbsp;↦&nbsp; <span :style="{ color: COL.blue }">I_C(Γ): {{ imgText }}</span><br />
      {{ ptText }} &nbsp;·&nbsp; maks |I_C(Γ) − rumus| = {{ residual.toExponential(1) }} (64 titik)
    </div>
  </div>
</template>
