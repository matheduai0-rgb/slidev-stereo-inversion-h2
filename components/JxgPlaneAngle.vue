<script setup lang="ts">
// Tangent vectors of circlines in ℝ² and the angle between two circlines.
// mode="tangent": one circline, moving p, tangent T ⟂ ∇F(p).   mode="angle": two circlines, both meets, θ is the same at each.
import { ref, watch } from 'vue'
import {
  add, asCircline, circlineCoeffs, circlineMeet, circlineTangent, coeffsCos, coeffsNormal, deg, dot, fmt, KTOL, len, angle2, type Coeffs,
  makeC, mul, perp, sampleC, sub, type Circ, type V2,
} from './lib/geom'
import { arrow2, COL, dragPoint, fnPoint, GGB2D, pcurve, useBoard, usePlayer } from './lib/jxg'

const props = defineProps({
  height: { type: String, default: '290px' },
  mode: { type: String, default: 'angle' },
})
const el = ref<HTMLElement | null>(null)
const b1 = ref(0.4), k1 = ref(0.6), b2 = ref(2.6), k2 = ref(-0.75), s = ref(0.9)
const playing = ref(false)
const flip2 = ref(1) // +1: C₂ in its J∇F direction, −1: reversed (θ ↦ π − θ)
const readout = ref('')
const tangentMode = props.mode === 'tangent'

let A1: any, A2: any
const C1 = (): Circ => makeC([A1.X(), A1.Y()], b1.value, k1.value)
const C2 = (): Circ => makeC([A2.X(), A2.Y()], b2.value, k2.value)
/** point of C₁ at parameter s */
const P = (): V2 => {
  const C = C1()
  if (C.line) return add(C.A, mul(perp(C.n), 3 * Math.sin(s.value)))
  return [C.q[0] + C.r * Math.cos(s.value), C.q[1] + C.r * Math.sin(s.value)]
}
const meets = () => circlineMeet(asCircline(C1()), asCircline(C2()))
/** arc from tangent vector u to tangent vector v at X (angle in [0, π], Lee 3.1) */
function arc(X: V2, u: V2, v: V2, r = 0.45): V2[] {
  const a0 = Math.atan2(u[1], u[0]); let a1 = Math.atan2(v[1], v[0])
  while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI
  while (a1 - a0 < -Math.PI) a1 += 2 * Math.PI
  return Array.from({ length: 31 }, (_, i) => { const t = a0 + ((a1 - a0) * i) / 30; return [X[0] + r * Math.cos(t), X[1] + r * Math.sin(t)] as V2 })
}
const NaNs: V2 = [NaN, NaN]

const B = useBoard(el, [-4, 4, 4, -4], GGB2D, (board) => {
  A1 = dragPoint(board, tangentMode ? [0.6, -0.4] : [-0.9, -0.3], 'A₁')
  A2 = dragPoint(board, [1.1, 0.4], 'A₂')
  pcurve(board, () => sampleC(C1()), { strokeColor: COL.coral, strokeWidth: 2.4 })
  if (tangentMode) {
    A2.setAttribute({ visible: false })
    const Pp = fnPoint(board, P, 'p', COL.fg, 3.5)
    const T = () => circlineTangent(asCircline(C1()), P())
    const Nn = () => { const g = coeffsNormal(circlineCoeffs(asCircline(C1())), P()); return mul(g, 1 / len(g)) }
    arrow2(board, P, () => add(P(), mul(T(), 1.3)), COL.coral)
    arrow2(board, P, () => add(P(), mul(Nn(), 1.0)), COL.emerald).setAttribute({ dash: 2, strokeWidth: 2 })
    fnPoint(board, () => { const C = C1(); return C.line ? NaNs : C.q }, 'q', COL.dim, 2.5)
    pcurve(board, () => { const C = C1(); return C.line ? [] : [C.q, P()] }, { strokeColor: COL.dim, strokeWidth: 1.2, dash: 1 })
    void Pp
    board.on('update', () => {
      const o = asCircline(C1()), c = circlineCoeffs(o), p = P(), t = T(), g = coeffsNormal(c, p)
      const desc = o.type === 'circle' ? `C₁ = C(q, r), q = (${fmt(o.c[0], 2)}, ${fmt(o.c[1], 2)}), r = ${o.s.toFixed(3)}` : 'C₁ garis'
      readout.value = `${desc}  ·  F = ${c.A.toFixed(0)}|u|² + (${fmt(c.B[0], 2)}, ${fmt(c.B[1], 2)})·u + ${fmt(c.C, 2)}` +
        `  ·  T = (${fmt(t[0], 3)}, ${fmt(t[1], 3)})  ·  T·∇F(p) = ${fmt(dot(t, g), 6)}`
    })
  } else {
    pcurve(board, () => sampleC(C2()), { strokeColor: COL.amber, strokeWidth: 2.4 })
    for (const i of [0, 1]) {
      const X = () => meets()[i] ?? NaNs
      fnPoint(board, X, i ? 'p₂' : 'p₁', COL.fg, 3.5)
      const t1 = () => circlineTangent(asCircline(C1()), X()), t2 = () => mul(circlineTangent(asCircline(C2()), X()), flip2.value)
      arrow2(board, X, () => add(X(), mul(t1(), 1.1)), COL.coral)
      arrow2(board, X, () => add(X(), mul(t2(), 1.1)), COL.amber)
      pcurve(board, () => (meets()[i] ? arc(X(), t1(), t2()) : []), { strokeColor: COL.fg, strokeWidth: 1.8 })
    }
    board.on('update', () => {
      const o1 = asCircline(C1()), o2 = asCircline(C2()), M = meets()
      if (!M.length) { readout.value = 'C₁ dan C₂ tidak berpotongan (di ℝ²)'; return }
      const f = flip2.value, k2c = circlineCoeffs(o2), F2: Coeffs = { A: f * k2c.A, B: mul(k2c.B, f), C: f * k2c.C }
      const th = M.map((X) => deg(angle2(circlineTangent(o1, X), mul(circlineTangent(o2, X), f))))
      const cf = deg(Math.acos(Math.max(-1, Math.min(1, coeffsCos(circlineCoeffs(o1), F2)))))
      let extra = ''
      if (o1.type === 'circle' && o2.type === 'circle') {
        const d = len(sub(o1.c, o2.c)), lc = (f * (o1.s ** 2 + o2.s ** 2 - d * d)) / (2 * o1.s * o2.s)
        extra = `  ·  ${f < 0 ? '−' : ''}(r₁²+r₂²−d²)/(2r₁r₂) = ${fmt(lc, 4)} ⇒ θ = ${deg(Math.acos(Math.max(-1, Math.min(1, lc)))).toFixed(3)}°  ·  d² − r₁² − r₂² = ${fmt(d * d - o1.s ** 2 - o2.s ** 2, 4)}`
      }
      readout.value = th.map((t, i) => `θ(p${i ? '₂' : '₁'}) = ${t.toFixed(3)}°`).join('   ') + `   ·  rumus koefisien: ${cf.toFixed(3)}°` + extra
    })
  }
  board.update()
})
watch([b1, k1, b2, k2, s, flip2], () => B.update())
const player = usePlayer((t) => { s.value = (0.9 + 0.8 * t) % (2 * Math.PI) })

/** choose κ₂ (keeping A₂ and the normal direction β₂) so that C₂ ⊥ C₁ */
function makeOrtho() {
  const C = C1(), A: V2 = [A2.X(), A2.Y()], n: V2 = [Math.cos(b2.value), Math.sin(b2.value)]
  let t: number // t = 1/κ₂, centre q₂ = A + t n
  if (C.line) { const den = dot(C.n, n); if (Math.abs(den) < 1e-9) { k2.value = 0; return } t = (C.k - dot(C.n, A)) / den }
  else { const w = sub(A, C.q), den = 2 * dot(w, n); if (Math.abs(den) < 1e-9) { k2.value = 0; return } t = (C.r * C.r - dot(w, w)) / den }
  const k = 1 / t
  k2.value = Math.abs(k) < KTOL ? 0 : Math.max(-3, Math.min(3, k))
}
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <template v-if="tangentMode">
        <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶' }}</button>
        <span>p</span><input v-model.number="s" type="range" min="0" max="6.283" step="any" style="width: 70px" />
      </template>
      <span style="color: #D32F2F">β₁</span><input v-model.number="b1" type="range" min="0" max="6.283" step="any" style="width: 55px" />
      <span style="color: #D32F2F">κ₁</span><input v-model.number="k1" type="range" min="-1.5" max="1.5" step="any" style="width: 55px" />
      <template v-if="!tangentMode">
        <span style="color: #EF6C00">β₂</span><input v-model.number="b2" type="range" min="0" max="6.283" step="any" style="width: 55px" />
        <span style="color: #EF6C00">κ₂</span><input v-model.number="k2" type="range" min="-3" max="3" step="any" style="width: 55px" />
        <button class="jxg-btn" @click="makeOrtho">C₂ ⊥ C₁</button>
        <button class="jxg-btn" :class="{ active: flip2 < 0 }" @click="flip2 = -flip2">balik arah C₂</button>
      </template>
      <button class="jxg-btn" @click="k1 = 0">κ₁ = 0 (garis)</button>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
