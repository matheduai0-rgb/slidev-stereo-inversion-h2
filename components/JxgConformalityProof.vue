<script setup lang="ts">
// Teorema 3.5 (Lee's geometric proof). `step` (0–5) follows the slide's clicks.
import { computed, ref, watch } from 'vue'
import {
  angle2, angle3, deg, dMap, NORTH, phi, planeThroughN, reflectBisector, sph, sphereCircle, tangent, v3, type V3,
} from './lib/geom'
import { COL, sphereView, useBoard } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '290px' }, step: { type: Number, default: 5 } })
const el = ref<HTMLElement | null>(null)
const theta = ref(0.7)
const colat = ref(1.9)
const gamma = ref(1.1)
const readout = ref('')
const step = computed(() => Math.max(0, Math.min(5, props.step)))

const PSI = 0.5
const P = () => sph(theta.value, colat.value)
const T = (i: number) => tangent(theta.value, colat.value, PSI + (i ? gamma.value : 0))
const Ccirc = (i: number) => { const { m, h } = planeThroughN(P(), T(i)); return sphereCircle(m, h, P()) }
const TN = (i: number) => reflectBisector(P(), T(i))
const dPhi = (i: number) => dMap(phi, P(), T(i))
const colI = (i: number) => (i ? COL.amber : COL.coral)
function arc3(X: V3, u: V3, v: V3, r: number): V3[] {
  u = v3.unit(u); const vv = v3.unit(v), a = angle3(u, vv), w = v3.unit(v3.sub(vv, v3.mul(u, v3.dot(u, vv))))
  return Array.from({ length: 41 }, (_, i) => { const s = (a * i) / 40; return v3.add(X, v3.mul(v3.add(v3.mul(u, Math.cos(s)), v3.mul(w, Math.sin(s))), r)) })
}
const line3 = (X: V3, d: V3): V3[] => { const u = v3.unit(d); return Array.from({ length: 401 }, (_, i) => v3.add(X, v3.mul(u, (i - 200) * 0.03))) }

let groups: any[][] = []
function applyStep() {
  groups.forEach((g, k) => g.forEach((o) => o.setAttribute({ visible: k <= step.value })))
}
const B = useBoard(el, [-3.6, 3.6, 3.6, -3.6], {}, (board) => {
  const S = sphereView(board)
  const img = () => { const q = phi(P()); return [q[0], q[1], 0] as V3 }
  groups = [
    // 0: p with tangents t1, t2 and angle θ
    [S.pt3(P, 'p', COL.fg, 4), ...[0, 1].map((i) => S.arrow3(P, () => v3.add(P(), v3.mul(T(i), 0.55)), colI(i))),
      S.scurve(() => arc3(P(), T(0), T(1), 0.28), { strokeColor: COL.fg, strokeWidth: 2 })],
    // 1: planes P_i and circles C_i through p and N
    [...[0, 1].map((i) => S.scurve(() => Ccirc(i), { strokeColor: colI(i), strokeWidth: 2.4, fillColor: colI(i), fillOpacity: 0.1 }))],
    // 2: bisector plane of pN, reflected tangents at N, angle θ at N
    [S.scurve(() => { const nb = v3.unit(v3.sub(NORTH, P())); return sphereCircle(nb, 0, v3.unit(v3.cross(nb, [1, 0.3, 0.1]))) },
      { strokeColor: COL.accent, strokeWidth: 1, fillColor: COL.accent, fillOpacity: 0.12 }),
     S.scurve(() => [P(), NORTH], { strokeColor: COL.dim, strokeWidth: 1.2, dash: 1 }),
     ...[0, 1].map((i) => S.arrow3(() => NORTH, () => v3.add(NORTH, v3.mul(TN(i), 0.55)), colI(i))),
     S.scurve(() => arc3(NORTH, TN(0), TN(1), 0.28), { strokeColor: COL.fg, strokeWidth: 2 })],
    // 3: lines L_i = P_i ∩ {z=0} through Φ(p)
    [S.cappedRay(P, COL.dim, 2), S.pt3(img, 'Φ(p)', COL.cyan, 4),
     ...[0, 1].map((i) => S.scurve(() => line3(img(), [...dPhi(i), 0] as V3), { strokeColor: colI(i), strokeWidth: 2.4 }, true))],
    // 4: tangent plane {z=1} and L'_i
    [S.scurve(() => [[-0.9, -0.9, 1], [0.9, -0.9, 1], [0.9, 0.9, 1], [-0.9, 0.9, 1], [-0.9, -0.9, 1]] as V3[],
      { strokeColor: COL.amber, strokeWidth: 1, fillColor: COL.amber, fillOpacity: 0.1 }),
     ...[0, 1].map((i) => S.scurve(() => [v3.add(NORTH, v3.mul(TN(i), -1.2)), v3.add(NORTH, v3.mul(TN(i), 1.2))], { strokeColor: colI(i), strokeWidth: 2.4, dash: 2 }))],
    // 5: angle θ at Φ(p)
    [S.scurve(() => arc3(img(), [...dPhi(0), 0] as V3, [...dPhi(1), 0] as V3, 0.35), { strokeColor: COL.fg, strokeWidth: 2 }, true)],
  ]
  applyStep()
  board.on('update', () => {
    const aP = deg(angle3(T(0), T(1))), aN = deg(angle3(TN(0), TN(1))), aI = deg(angle2(dPhi(0), dPhi(1)))
    const s = step.value
    readout.value = `∠_p = ${aP.toFixed(3)}°` + (s >= 2 ? `   ∠_N = ${aN.toFixed(3)}°` : '') + (s >= 5 ? `   ∠_Φ(p) = ${aI.toFixed(3)}°` : '') +
      (s >= 3 ? `   |dΦ t| = 1/(1−z) = ${(1 / (1 - P()[2])).toFixed(3)}` : '')
  })
  board.update()
})
watch(step, () => { applyStep(); B.update() })
watch([theta, colat, gamma], () => B.update())
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span style="color: var(--fg-dim)">θ</span><input v-model.number="theta" type="range" min="0" max="6.283" step="0.01" style="width: 70px" />
      <span style="color: var(--fg-dim)">φ</span><input v-model.number="colat" type="range" min="0.5" max="2.9" step="0.01" style="width: 70px" />
      <span style="color: var(--fg-dim)">∠(t₁,t₂)</span><input v-model.number="gamma" type="range" min="0.2" max="2.9" step="0.01" style="width: 70px" />
      <span style="color: var(--amber-accent)">langkah {{ step }}/5</span>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
