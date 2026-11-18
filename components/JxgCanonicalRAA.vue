<script setup lang="ts">
// Prop. 4.14 (RAA, Lee Fig. 4.7): p1 = (−a,b), p2 = (a,b). For q = (c,d), c > 0, the geodesic p1→q crosses the
// y-axis at p'; the geodesic p1→q' (q' = r̄_L q) stays in x < 0, so d(p1,q') < d(p1,p') + d(p',q') strictly.
import { ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { dH, geodesic, geodesicArc } from './lib/hyp'
import { COL, dragPointH, fnPoint, GGB2D, pcurve, shadeH2, useBoard } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '280px' } })
const el = ref<HTMLElement | null>(null)
const a = ref(1.1), b = ref(0.7)
const readout = ref('')

let Q: any
const p1 = (): V2 => [-a.value, b.value]
const p2 = (): V2 => [a.value, b.value]
const q = (): V2 => [Q.X(), Q.Y()]
const qp = (): V2 => [-Q.X(), Q.Y()]
/** p' = geodesic(p1, q) ∩ {x = 0} */
const pp = (): V2 => {
  const g = geodesic(p1(), q())
  if (q()[0] <= 0) return [NaN, NaN]
  if (g.type === 'v') return [NaN, NaN]
  return [0, Math.sqrt(Math.max(0, g.R * g.R - g.c * g.c))]
}

const B = useBoard(el, [-2.4, 2.8, 2.4, -0.3], GGB2D, (board) => {
  shadeH2(board)
  pcurve(board, () => [[0, 0], [0, 40]], { strokeColor: COL.emerald, strokeWidth: 2.6 })
  board.create('text', [0.08, 2.55, 'L (sumbu-y)'], { fontSize: 13, strokeColor: COL.emerald, fixed: true, highlight: false })
  Q = dragPointH(board, [0.8, 1.9], 'q')
  fnPoint(board, p1, 'p₁', COL.amber, 3.5)
  fnPoint(board, p2, 'p₂', COL.amber, 3.5)
  fnPoint(board, qp, "q'", COL.coral, 3.5)
  fnPoint(board, pp, "p'", COL.emerald, 3.5)
  pcurve(board, () => geodesicArc(p1(), q()), { strokeColor: COL.cyan, strokeWidth: 2.6 })
  pcurve(board, () => geodesicArc(p1(), qp()), { strokeColor: COL.coral, strokeWidth: 2.6 })
  pcurve(board, () => (Number.isFinite(pp()[1]) ? geodesicArc(pp(), qp()) : []), { strokeColor: COL.amber, strokeWidth: 1.6, dash: 2 })
  board.on('update', () => {
    if (Q.X() < 0.02) Q.moveTo([0.02, Q.Y()])
    const P = pp(), d1 = dH(p1(), qp()), d2 = dH(p1(), P) + dH(P, qp())
    readout.value = `d(p₁,q′) = ${d1.toFixed(4)} < d(p₁,p′) + d(p′,q′) = ${d2.toFixed(4)}  ·  d(p₁,q) = ${dH(p1(), q()).toFixed(4)} ≠ d(p₂,q) = ${dH(p2(), q()).toFixed(4)}  ⇒ q ∉ H₍p₁,p₂₎`
  })
  board.update()
})
watch([a, b], () => B.update())
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span style="color: var(--fg-dim)">seret q (c &gt; 0)</span>
      <span>a</span><input v-model.number="a" type="range" min="0.3" max="1.8" step="any" style="width: 60px" />
      <span>b</span><input v-model.number="b" type="range" min="0.3" max="2" step="any" style="width: 60px" />
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
