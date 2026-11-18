<script setup lang="ts">
// Thm 4.20 (Lee's proof): for non-collinear p1, p2, p3 put ψ₀ = φ and, for k = 1, 2, 3,
// ψ_k = I_{H_{p_k, ψ_{k−1}(p_k)}} ∘ ψ_{k−1} when ψ_{k−1}(p_k) ≠ p_k (else ψ_k = ψ_{k−1}).
// ψ₃ fixes p1, p2, p3, so ψ₃ = id (Thm 4.19) and φ = I₁ ∘ I₂ ∘ I₃ uses at most three inversions.
import { computed, ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { bisector, close2, dil, ellRot, geodesicArc, invH, sampleHLine, tA, type HLine } from './lib/hyp'
import { COL, dragPointH, fnPoint, GGB2D, pcurve, shadeH2, useBoard } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '270px' } })
const el = ref<HTMLElement | null>(null)
const a = ref(0.9), lr = ref(0.35), th = ref(0.6), refl = ref(false)
const step = ref(3)
const readout = ref('')
const LCOL = [COL.coral, COL.amber, COL.emerald]

type Map = (p: V2) => V2
const phi = (): Map => {
  const T = tA(a.value), D = dil(Math.exp(lr.value)), R = ellRot(th.value)
  return (p) => T(D(R(refl.value ? [-p[0], p[1]] : p)))
}
let Ps: any[] = []
const P = (i: number): V2 => [Ps[i].X(), Ps[i].Y()]
/** Lee's reduction: the inversion lines (null = point already fixed) and ψ₀..ψ₃ */
function reduce(): { lines: (HLine | null)[]; psi: Map[] } {
  const psi: Map[] = [phi()], lines: (HLine | null)[] = []
  for (let k = 0; k < 3; k++) {
    const prev = psi[k], pk = P(k), img = prev(pk)
    if (close2(img, pk, 1e-7)) { lines.push(null); psi.push(prev); continue }
    const L = bisector(pk, img), I = invH(L)
    lines.push(L); psi.push((p) => I(prev(p)))
  }
  return { lines, psi }
}
const tri = (): V2[] => [...geodesicArc(P(0), P(1), 120), [NaN, NaN], ...geodesicArc(P(1), P(2), 120), [NaN, NaN], ...geodesicArc(P(2), P(0), 120)]
const TEST: V2[] = [[0, 1], [1.3, 0.4], [-1.7, 2.2], [0.4, 2.8], [-0.6, 0.3]]

const B = useBoard(el, [-2.8, 3.2, 2.8, -0.3], GGB2D, (board) => {
  shadeH2(board)
  Ps = [dragPointH(board, [-1.1, 0.7], 'p₁'), dragPointH(board, [0.9, 0.9], 'p₂'), dragPointH(board, [-0.2, 2.0], 'p₃')]
  pcurve(board, tri, { strokeColor: COL.cyan, strokeWidth: 2.2 })
  pcurve(board, () => { const { psi } = reduce(); return tri().map((p) => (Number.isFinite(p[0]) ? psi[step.value](p) : p)) }, { strokeColor: COL.purple, strokeWidth: 2.4, dash: 2 })
  for (const k of [0, 1, 2]) {
    pcurve(board, () => { const L = reduce().lines[k]; return L && k < step.value ? sampleHLine(L, 300) : [] }, { strokeColor: LCOL[k], strokeWidth: 2.4 })
    fnPoint(board, () => reduce().psi[step.value](P(k)), `ψ(p${'₁₂₃'[k]})`, COL.purple, 3.5, { label: { strokeColor: COL.purple, offset: [7, -12] } })
  }
  board.on('update', () => {
    const { lines, psi } = reduce(), s = step.value, used = lines.filter(Boolean).length
    const fixed = [0, 1, 2].map((k) => (close2(psi[s](P(k)), P(k), 1e-7) ? '✓' : '✗'))
    const res = Math.max(...TEST.map((x) => Math.hypot(psi[3](x)[0] - x[0], psi[3](x)[1] - x[1])))
    const names = lines.map((L, k) => (L ? `I${'₁₂₃'[k]}` : '')).filter(Boolean)
    readout.value = `langkah ${s}: ψ${'₀₁₂₃'[s]} fiksasi p₁ ${fixed[0]}  p₂ ${fixed[1]}  p₃ ${fixed[2]}` +
      `  ·  φ = ${names.length ? names.join(' ∘ ') : 'id'}  (${used} inversi, ${used % 2 ? 'membalik' : 'mengawetkan'} orientasi)` +
      `  ·  max |ψ₃(x) − x| = ${res.toExponential(1)}`
  })
  board.update()
})
watch([a, lr, th, refl, step], () => B.update())
const preset = (k: string) => {
  if (k === 'id') { a.value = 0; lr.value = 0; th.value = 0; refl.value = false }
  if (k === 'refl') { a.value = 0; lr.value = 0; th.value = 0; refl.value = true }
  if (k === 'trans') { a.value = 1; lr.value = 0; th.value = 0; refl.value = false }
  if (k === 'glide') { a.value = 0.9; lr.value = 0.35; th.value = 0.6; refl.value = true }
}
const stepTxt = computed(() => ['ψ₀ = φ', 'ψ₁ = I₁∘φ', 'ψ₂ = I₂∘ψ₁', 'ψ₃ = I₃∘ψ₂'][step.value])
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span>langkah</span><input v-model.number="step" type="range" min="0" max="3" step="1" style="width: 55px" />
      <b style="color: var(--amber-accent)">{{ stepTxt }}</b>
      <span>φ: a</span><input v-model.number="a" type="range" min="-1.5" max="1.5" step="any" style="width: 50px" />
      <span>ln r</span><input v-model.number="lr" type="range" min="-0.8" max="0.8" step="any" style="width: 50px" />
      <span>θ</span><input v-model.number="th" type="range" min="-3.14" max="3.14" step="any" style="width: 50px" />
      <label><input v-model="refl" type="checkbox" /> refleksi</label>
    </div>
    <div class="jxg-controls">
      <button class="jxg-btn" @click="preset('id')">φ = id</button>
      <button class="jxg-btn" @click="preset('refl')">refleksi x ↦ −x̄</button>
      <button class="jxg-btn" @click="preset('trans')">translasi t₍₁,₀₎</button>
      <button class="jxg-btn" @click="preset('glide')">umum</button>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
