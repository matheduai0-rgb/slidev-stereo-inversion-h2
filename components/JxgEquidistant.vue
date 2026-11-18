<script setup lang="ts">
// Def. 4.13 / Prop. 4.14 / Thm 4.16: H_{p1,p2} = {q : d_H(q,p1) = d_H(q,p2)} is a vertical line or a semicircle
// centred on the x-axis; it meets the geodesic p1p2 at right angles in its hyperbolic midpoint.
import { ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { bisector, dH, geodesic, geodesicArc, hlinePoint, sampleHLine, type HLine } from './lib/hyp'
import { COL, dragPointH, fnPoint, GGB2D, pcurve, shadeH2, useBoard, usePlayer } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '280px' } })
const el = ref<HTMLElement | null>(null)
const u = ref(0.35)
const playing = ref(false)
const readout = ref('')

let P1: any, P2: any
const p1 = (): V2 => [P1.X(), P1.Y()]
const p2 = (): V2 => [P2.X(), P2.Y()]
const H = (): HLine => bisector(p1(), p2())
const Q = (): V2 => hlinePoint(H(), u.value)
/** angle (deg) between two hyperbolic lines at a common point, from centres/radii */
function crossAngle(a: HLine, b: HLine): number {
  if (a.type === 'v' && b.type === 'v') return 0
  if (a.type === 'v' || b.type === 'v') { const v = (a.type === 'v' ? a : b) as any, c = (a.type === 'c' ? a : b) as any; return (Math.acos(Math.min(1, Math.abs(v.x - c.c) / c.R)) * 180) / Math.PI }
  const d = Math.abs(a.c - b.c), cs = (a.R * a.R + b.R * b.R - d * d) / (2 * a.R * b.R)
  return (Math.acos(Math.max(-1, Math.min(1, Math.abs(cs)))) * 180) / Math.PI
}
const B = useBoard(el, [-2.6, 3, 2.6, -0.3], GGB2D, (board) => {
  shadeH2(board)
  P1 = dragPointH(board, [0.3, 0.5], 'p₁')
  P2 = dragPointH(board, [-0.2, 1.8], 'p₂')
  pcurve(board, () => sampleHLine(H(), 400), { strokeColor: COL.emerald, strokeWidth: 3 })
  pcurve(board, () => sampleHLine(geodesic(p1(), p2()), 300), { strokeColor: COL.cyan, strokeWidth: 1, dash: 2 })
  pcurve(board, () => geodesicArc(p1(), p2()), { strokeColor: COL.cyan, strokeWidth: 2.4 })
  fnPoint(board, Q, 'q', COL.fg, 3.5)
  pcurve(board, () => geodesicArc(Q(), p1(), 200), { strokeColor: COL.amber, strokeWidth: 1.6, dash: 1 })
  pcurve(board, () => geodesicArc(Q(), p2(), 200), { strokeColor: COL.amber, strokeWidth: 1.6, dash: 1 })
  fnPoint(board, () => { const L = H(); return L.type === 'c' ? [L.c, 0] : [NaN, NaN] }, '', COL.emerald, 2.5)
  board.on('update', () => {
    const L = H(), q = Q()
    const desc = L.type === 'v' ? `garis vertikal x = ${L.x.toFixed(3)}` : `lingkaran pusat (${L.c.toFixed(3)}, 0), R = ${L.R.toFixed(3)}`
    readout.value = `H₍p₁,p₂₎: ${desc}  ·  d_H(q,p₁) = ${dH(q, p1()).toFixed(5)}  d_H(q,p₂) = ${dH(q, p2()).toFixed(5)}` +
      `  ·  ∠(H, γ₁₂) = ${crossAngle(L, geodesic(p1(), p2())).toFixed(3)}°`
  })
  board.update()
})
watch(u, () => B.update())
const player = usePlayer((t) => { u.value = 0.05 + 0.9 * (0.5 - 0.5 * Math.cos(0.9 * t)) })
function canonical() {
  const a = Math.max(0.3, Math.abs(P2.X() - P1.X()) / 2), b = (P1.Y() + P2.Y()) / 2
  P1.moveTo([-a, b]); P2.moveTo([a, b]); B.update()
}
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶' }}</button>
      <span>q ∈ H</span><input v-model.number="u" type="range" min="0.02" max="0.98" step="any" style="width: 80px" />
      <span style="color: var(--fg-dim)">seret p₁, p₂</span>
      <button class="jxg-btn" @click="canonical">kanonik (−a,b), (a,b)</button>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
