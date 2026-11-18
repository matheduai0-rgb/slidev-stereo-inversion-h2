<script setup lang="ts">
// Poincaré's thought experiment: step length ∝ temperature T = y. Footsteps of equal hyperbolic
// length along the Euclidean segment pq and along the arc of the semicircle through p, q.
import { ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { dH, dot, footsteps, geodesicArc, hypLength, pointAtFraction } from './lib/hyp'
import { COL, dragPointH, fnPoint, GGB2D, pcurve, shadeH2, useBoard, usePlayer } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '270px' } })
const el = ref<HTMLElement | null>(null)
const playing = ref(false)
const walk = ref(1)
const readout = ref('')

let P: any, Q: any
const p = (): V2 => [P.X(), P.Y()]
const q = (): V2 => [Q.X(), Q.Y()]
const seg = (): V2[] => Array.from({ length: 401 }, (_, i) => [p()[0] + ((q()[0] - p()[0]) * i) / 400, p()[1] + ((q()[1] - p()[1]) * i) / 400] as V2)
const arc = (): V2[] => geodesicArc(p(), q(), 400)
const step = () => dH(p(), q()) / 6 // the arc takes exactly 6 steps
const marks = (pts: V2[]) => footsteps(pts, step()).flatMap((x) => dot(x, 0.07 * x[1]))

const B = useBoard(el, [-2.6, 2.3, 2.6, -0.3], GGB2D, (board) => {
  shadeH2(board)
  P = dragPointH(board, [-1.3, 0.55], 'p')
  Q = dragPointH(board, [1.3, 0.55], 'q')
  pcurve(board, seg, { strokeColor: COL.coral, strokeWidth: 2, dash: 2 })
  pcurve(board, arc, { strokeColor: COL.cyan, strokeWidth: 2.6 })
  pcurve(board, () => marks(seg()), { strokeColor: COL.coral, strokeWidth: 1.4, fillColor: COL.coral, fillOpacity: 0.25 })
  pcurve(board, () => marks(arc()), { strokeColor: COL.cyan, strokeWidth: 1.4, fillColor: COL.cyan, fillOpacity: 0.25 })
  // two walkers moving at the same hyperbolic speed
  fnPoint(board, () => { const L = hypLength(seg()), f = Math.min(1, (walk.value * 9 * step()) / L); return pointAtFraction(seg(), f) }, '', COL.coral, 4)
  fnPoint(board, () => { const L = hypLength(arc()), f = Math.min(1, (walk.value * 9 * step()) / L); return pointAtFraction(arc(), f) }, '', COL.cyan, 4)
  board.on('update', () => {
    const ls = hypLength(seg()), la = hypLength(arc())
    readout.value = `segmen Euklides: l_H = ${ls.toFixed(3)} ≈ ${(ls / step()).toFixed(1)} langkah   ·   busur: l_H = ${la.toFixed(3)} = 6 langkah`
  })
  board.update()
})
watch(walk, () => B.update())
const player = usePlayer((t) => { walk.value = Math.min(1, (t % 7) / 6) })
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶' }}</button>
      <span>jalan</span><input v-model.number="walk" type="range" min="0" max="1" step="0.005" style="width: 110px" />
      <span style="color: var(--fg-dim)">ukuran jejak ∝ y = suhu</span>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
