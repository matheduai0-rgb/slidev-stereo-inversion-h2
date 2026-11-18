<script setup lang="ts">
// Thm 4.9 / Def. 4.10 / Akibat 4.11: the unique shortest path through p₁, p₂ and d_H;
// in triangle mode, d₁₃ ≤ d₁₂ + d₂₃ with equality iff p₂ lies on γ₁₃.
import { ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { dH, geodesic, geodesicArc, hypLength, pointAtFraction, sampleHLine } from './lib/hyp'
import { COL, dragPointH, GGB2D, pcurve, shadeH2, useBoard } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '280px' }, triangle: { type: Boolean, default: false } })
const el = ref<HTMLElement | null>(null)
const readout = ref('')

let P1: any, P2: any, P3: any
const p1 = (): V2 => [P1.X(), P1.Y()]
const p2 = (): V2 => [P2.X(), P2.Y()]
const p3 = (): V2 => [P3.X(), P3.Y()]
const B = useBoard(el, [-2.6, 3, 2.6, -0.3], GGB2D, (board) => {
  shadeH2(board)
  P1 = dragPointH(board, props.triangle ? [-1.6, 0.6] : [-1.2, 0.7], 'p₁')
  P2 = dragPointH(board, props.triangle ? [0.2, 2.2] : [1.3, 1.6], 'p₂')
  if (props.triangle) {
    P3 = dragPointH(board, [1.7, 0.8], 'p₃')
    pcurve(board, () => geodesicArc(p1(), p3()), { strokeColor: COL.coral, strokeWidth: 3 })
    pcurve(board, () => geodesicArc(p1(), p2()), { strokeColor: COL.cyan, strokeWidth: 2.6 })
    pcurve(board, () => geodesicArc(p2(), p3()), { strokeColor: COL.cyan, strokeWidth: 2.6 })
    pcurve(board, () => sampleHLine(geodesic(p1(), p3())), { strokeColor: COL.coral, strokeWidth: 1, dash: 2 })
  } else {
    pcurve(board, () => sampleHLine(geodesic(p1(), p2())), { strokeColor: COL.cyan, strokeWidth: 1.3, dash: 2 })
    pcurve(board, () => geodesicArc(p1(), p2()), { strokeColor: COL.cyan, strokeWidth: 3.2 })
  }
  board.on('update', () => {
    if (!props.triangle) {
      const g = geodesic(p1(), p2())
      const desc = g.type === 'v' ? `garis vertikal x = ${g.x.toFixed(2)}` : `lingkaran pusat (${g.c.toFixed(2)}, 0), R = ${g.R.toFixed(2)}`
      readout.value = `Γ: ${desc}   ·   d_H = 2 artanh(d/d′) = ${dH(p1(), p2()).toFixed(5)}   ∫_γ = ${hypLength(geodesicArc(p1(), p2(), 4000)).toFixed(5)}`
    } else {
      const d12 = dH(p1(), p2()), d23 = dH(p2(), p3()), d13 = dH(p1(), p3())
      readout.value = `d₁₃ = ${d13.toFixed(4)}  ≤  d₁₂ + d₂₃ = ${d12.toFixed(4)} + ${d23.toFixed(4)} = ${(d12 + d23).toFixed(4)}   (selisih ${(d12 + d23 - d13).toFixed(4)})`
    }
  })
  board.update()
})
function snap() { const m = pointAtFraction(geodesicArc(p1(), p3(), 2000), 0.4); P2.moveTo(m); B.update() }
watch(() => props.triangle, () => B.update())
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span style="color: var(--fg-dim)">seret {{ props.triangle ? 'p₁, p₂, p₃' : 'p₁, p₂' }}</span>
      <button v-if="props.triangle" class="jxg-btn" @click="snap">letakkan p₂ pada γ₁₃</button>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
