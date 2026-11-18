<script setup lang="ts">
// Lemma 4.17 (swap): the inversion in H = H_{p1,p2} sends p1 to p2; H fixes its own points and is ⟂ to γ₁₂.
// A test point x and its image I_H(x) show the reflection-like action; d_H(x, h) = d_H(I_H x, h) for h ∈ H.
import { ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { bisector, dH, geodesic, geodesicArc, hlinePoint, invH, sampleHLine } from './lib/hyp'
import { COL, dragPointH, fnPoint, GGB2D, pcurve, shadeH2, useBoard } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '280px' } })
const el = ref<HTMLElement | null>(null)
const readout = ref('')
const u = ref(0.4)

let P1: any, P2: any, X: any
const p1 = (): V2 => [P1.X(), P1.Y()]
const p2 = (): V2 => [P2.X(), P2.Y()]
const x = (): V2 => [X.X(), X.Y()]
const H = () => bisector(p1(), p2())
const I = (p: V2) => invH(H())(p)
const h = (): V2 => hlinePoint(H(), u.value)

const B = useBoard(el, [-2.6, 3, 2.6, -0.3], GGB2D, (board) => {
  shadeH2(board)
  P1 = dragPointH(board, [0.2, 0.5], 'p₁')
  P2 = dragPointH(board, [1.0, 1.8], 'p₂')
  X = dragPointH(board, [-1.6, 1.8], 'x')
  pcurve(board, () => sampleHLine(H(), 400), { strokeColor: COL.emerald, strokeWidth: 3 })
  pcurve(board, () => sampleHLine(geodesic(p1(), p2()), 300), { strokeColor: COL.cyan, strokeWidth: 1, dash: 2 })
  pcurve(board, () => geodesicArc(p1(), p2()), { strokeColor: COL.cyan, strokeWidth: 2.2 })
  fnPoint(board, () => I(p1()), 'I_H(p₁)', COL.coral, 6, { fillOpacity: 0, strokeWidth: 2.5, label: { strokeColor: COL.coral, offset: [8, -14] } })
  fnPoint(board, () => I(x()), 'I_H(x)', COL.purple, 3.5)
  pcurve(board, () => geodesicArc(x(), I(x()), 300), { strokeColor: COL.purple, strokeWidth: 1.3, dash: 2 })
  fnPoint(board, h, 'h', COL.emerald, 3)
  board.on('update', () => {
    const e = Math.hypot(I(p1())[0] - p2()[0], I(p1())[1] - p2()[1]), L = H()
    const desc = L.type === 'v' ? `x = ${L.x.toFixed(3)}` : `C((${L.c.toFixed(3)}, 0), ${L.R.toFixed(3)})`
    readout.value = `H = ${desc}  ·  |I_H(p₁) − p₂| = ${e.toExponential(1)}  ·  d_H(x,h) = ${dH(x(), h()).toFixed(5)} = d_H(I_H x, h) = ${dH(I(x()), h()).toFixed(5)}` +
      `  ·  I_H(I_H x) = x: ${Math.hypot(I(I(x()))[0] - x()[0], I(I(x()))[1] - x()[1]).toExponential(1)}`
  })
  board.update()
})
watch(u, () => B.update())
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span style="color: var(--fg-dim)">seret p₁, p₂, x</span>
      <span>h ∈ H</span><input v-model.number="u" type="range" min="0.02" max="0.98" step="any" style="width: 80px" />
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
