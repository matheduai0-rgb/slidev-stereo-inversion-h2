<script setup lang="ts">
// Circles Ĉ = S² ∩ {n̂·x = h}: tangent n̂ × p, angle formula, and (mode="project") the images under Φ with dΦ.
import { computed, ref, watch } from 'vue'
import {
  angle3, circleOnSphere, circlePoint, coeffsCos, coeffsToCircline, deg, dMap, dPhiExact, len, angle2, nFrom,
  phi, sampleCircline, sphereCircleMeet, sphereCos, sphereToCoeffs, v3, type V2, type V3,
} from './lib/geom'
import { COL, sphereView, useBoard, usePlayer } from './lib/jxg'

const props = defineProps({
  height: { type: String, default: '300px' },
  mode: { type: String, default: 'angle' }, // 'tangent' | 'angle' | 'project'
})
const el = ref<HTMLElement | null>(null)
const az1 = ref(0.2), al1 = ref(1.15), h1 = ref(-0.25)
const az2 = ref(2.3), al2 = ref(0.85), h2 = ref(-0.3)
const s = ref(4.2)
const playing = ref(false)
const flip2 = ref(1) // −1 reverses Ĉ₂: (n̂₂, h₂) ↦ (−n̂₂, −h₂), same circle, θ ↦ π − θ
const readout = ref('')
const M = props.mode
// project mode: defaults chosen so both Φ(Ĉᵢ) fit in the plane square and one meet lies outside the sphere's shadow
if (M === 'project') { az1.value = 1.9; al1.value = 0.9; h1.value = -0.2; az2.value = 3.4; al2.value = 0.9; h2.value = -0.2 }
const two = M !== 'tangent'

const n1 = () => nFrom(az1.value, al1.value), n2raw = () => nFrom(az2.value, al2.value)
/** oriented Ĉ₂ (direction n̂₂ × p) */
const n2 = () => v3.mul(n2raw(), flip2.value), h2o = () => flip2.value * h2.value
const meets = () => (two ? sphereCircleMeet(n1(), h1.value, n2(), h2o()) : [])
const NAN3: V3 = [NaN, NaN, NaN]
const unitT = (n: V3, p: V3) => v3.unit(v3.cross(n, p))
function arc3(X: V3, u: V3, v: V3, r = 0.3): V3[] {
  u = v3.unit(u); const vv = v3.unit(v) // arc from u to v, angle in [0, π] (Lee 3.1)
  const a = angle3(u, vv), w = v3.unit(v3.sub(vv, v3.mul(u, v3.dot(u, vv))))
  return Array.from({ length: 31 }, (_, i) => { const t = (a * i) / 30; return v3.add(X, v3.mul(v3.add(v3.mul(u, Math.cos(t)), v3.mul(w, Math.sin(t))), r)) })
}
const z0 = (q: V2): V3 => [q[0], q[1], 0]

const B = useBoard(el, [-3.6, 3.6, 3.6, -3.6], {}, (board) => {
  const S = sphereView(board, 2.5, 1.4, 0.55, M === 'project' ? 0.5 : 0.32)
  const circ = (n: () => V3, h: () => number, col: string) =>
    S.scurve(() => circleOnSphere(n(), h()), { strokeColor: col, strokeWidth: 2.6, fillColor: col, fillOpacity: 0.08 })
  circ(n1, () => h1.value, COL.coral)
  if (two) circ(n2, h2o, COL.amber)

  if (M === 'tangent') {
    const P = () => circlePoint(n1(), h1.value, s.value)
    const ctr = () => v3.mul(n1(), h1.value)
    S.pt3(ctr, '', COL.dim, 2.5)
    S.arrow3(ctr, () => v3.add(ctr(), v3.mul(n1(), 0.7)), COL.emerald)
    S.scurve(() => [ctr(), P()], { strokeColor: COL.dim, strokeWidth: 1.2, dash: 1 })
    S.scurve(() => [[0, 0, 0], P()], { strokeColor: COL.dim, strokeWidth: 1, dash: 2 })
    S.pt3(P, 'p', COL.fg, 4)
    S.arrow3(P, () => v3.add(P(), v3.mul(v3.cross(n1(), P()), 0.9)), COL.coral)
    board.on('update', () => {
      const p = P(), t = v3.cross(n1(), p), h = h1.value
      const num = v3.sub(circlePoint(n1(), h, s.value + 1e-6), circlePoint(n1(), h, s.value - 1e-6)).map((x) => x / 2e-6) as V3
      readout.value = `t = n̂×p = (${t.map((x) => x.toFixed(3)).join(', ')})  ·  t·p = ${v3.dot(t, p).toFixed(6)}  ·  t·n̂ = ${v3.dot(t, n1()).toFixed(6)}` +
        `  ·  |t|² = ${v3.dot(t, t).toFixed(5)} = 1 − h² = ${(1 - h * h).toFixed(5)}  ·  |p′(s) − t| = ${v3.len(v3.sub(num, t)).toExponential(1)}`
    })
  } else {
    for (const i of [0, 1]) {
      const X = () => meets()[i] ?? NAN3
      S.pt3(X, i ? 'p₂' : 'p₁', COL.fg, 4)
      S.arrow3(X, () => v3.add(X(), v3.mul(unitT(n1(), X()), 0.7)), COL.coral)
      S.arrow3(X, () => v3.add(X(), v3.mul(unitT(n2(), X()), 0.7)), COL.amber)
      S.scurve(() => (meets()[i] ? arc3(X(), unitT(n1(), X()), unitT(n2(), X())) : []), { strokeColor: COL.fg, strokeWidth: 1.8 })
    }
    if (M === 'project') {
      const img = (n: () => V3, h: () => number) => () => sampleCircline(coeffsToCircline(sphereToCoeffs({ nh: n(), h: h() })), 500).map(z0)
      S.scurve(img(n1, () => h1.value), { strokeColor: COL.coral, strokeWidth: 2.2 }, true)
      S.scurve(img(n2, h2o), { strokeColor: COL.amber, strokeWidth: 2.2 }, true)
      for (const i of [0, 1]) {
        const X = () => meets()[i] ?? NAN3
        const Y = S.onPlane(() => phi(X()))
        S.cappedRay(X, COL.dim, 2)
        S.pt3(Y, i ? 'Φ(p₂)' : 'Φ(p₁)', COL.cyan, 3.5)
        const dir = (n: () => V3) => () => { const d = dPhiExact(X(), unitT(n(), X())), l = len(d) || 1; return v3.add(Y(), [0.7 * d[0] / l, 0.7 * d[1] / l, 0]) }
        S.arrow3(Y, dir(n1), COL.coral)
        S.arrow3(Y, dir(n2), COL.amber)
      }
    }
    board.on('update', () => {
      const P = meets()
      if (!P.length) { readout.value = 'Ĉ₁ dan Ĉ₂ tidak berpotongan'; return }
      const N1 = n1(), N2 = n2(), H1 = h1.value, H2 = h2o()
      const th = P.map((X) => deg(angle3(v3.cross(N1, X), v3.cross(N2, X))))
      const cf = deg(Math.acos(Math.max(-1, Math.min(1, sphereCos(N1, H1, N2, H2)))))
      let txt = th.map((t, i) => `θ(p${i ? '₂' : '₁'}) = ${t.toFixed(4)}°`).join('   ') + `   ·  rumus (n̂₁·n̂₂ − h₁h₂)/√… : ${cf.toFixed(4)}°` +
        `  ·  n̂₁·n̂₂ − h₁h₂ = ${(v3.dot(N1, N2) - H1 * H2).toFixed(4)}`
      if (M === 'project') {
        const X = P[0], ta = unitT(N1, X), tb = unitT(N2, X)
        const pl = deg(angle2(dPhiExact(X, ta), dPhiExact(X, tb)))
        const bridge = deg(Math.acos(Math.max(-1, Math.min(1, coeffsCos(sphereToCoeffs({ nh: N1, h: H1 }), sphereToCoeffs({ nh: N2, h: H2 }))))))
        const stretch = len(dPhiExact(X, ta)) * (1 - X[2]), err = len(dMap(phi, X, ta).map((x, k) => x - dPhiExact(X, ta)[k]) as V2)
        txt = `∠ di S² = ${th[0].toFixed(4)}°   ∠ di ℝ² = ${pl.toFixed(4)}°   rumus koefisien Φ(Ĉᵢ) = ${bridge.toFixed(4)}°` +
          `  ·  |dΦ t|(1−z)/|t| = ${stretch.toFixed(6)}  ·  |dΦ_numerik − dΦ_eksak| = ${err.toExponential(1)}`
      }
      readout.value = txt
    })
  }
  board.update()
})
watch([az1, al1, h1, az2, al2, h2, s, flip2], () => B.update())
const player = usePlayer((t) => { s.value = (4.2 + 0.8 * t) % (2 * Math.PI) })
const canOrtho = computed(() => Math.abs(h1.value) > 0.02)
/** n̂₁·n̂₂ = h₁h₂ ⇔ Ĉ₁ ⊥ Ĉ₂: solve for h₂ */
function makeOrtho() {
  const g = v3.dot(n1(), n2raw())
  if (Math.abs(h1.value) > 1e-6) { const h = g / h1.value; if (Math.abs(h) < 0.95) h2.value = h }
}
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <template v-if="M === 'tangent'">
        <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶' }}</button>
        <span>p</span><input v-model.number="s" type="range" min="0" max="6.283" step="any" style="width: 60px" />
      </template>
      <span style="color: #D32F2F">Ĉ₁: β</span><input v-model.number="az1" type="range" min="0" max="6.283" step="any" style="width: 45px" />
      <span style="color: #D32F2F">α</span><input v-model.number="al1" type="range" min="0" max="3.14" step="any" style="width: 45px" />
      <span style="color: #D32F2F">h</span><input v-model.number="h1" type="range" min="-0.95" max="0.95" step="any" style="width: 45px" />
      <template v-if="two">
        <span style="color: #EF6C00">Ĉ₂: β</span><input v-model.number="az2" type="range" min="0" max="6.283" step="any" style="width: 45px" />
        <span style="color: #EF6C00">α</span><input v-model.number="al2" type="range" min="0" max="3.14" step="any" style="width: 45px" />
        <span style="color: #EF6C00">h</span><input v-model.number="h2" type="range" min="-0.95" max="0.95" step="any" style="width: 45px" />
        <button class="jxg-btn" :disabled="!canOrtho" @click="makeOrtho">⊥</button>
        <button class="jxg-btn" @click="h1 = 0; h2 = 0">lingkaran besar</button>
        <button class="jxg-btn" :class="{ active: flip2 < 0 }" @click="flip2 = -flip2">balik arah Ĉ₂</button>
      </template>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
