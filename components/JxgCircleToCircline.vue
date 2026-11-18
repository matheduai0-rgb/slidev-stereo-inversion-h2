<script setup lang="ts">
// Teorema 3.4: C = S² ∩ {ax+by+cz+d=0} ↦ circle with centre −(a,b)/(c+d), radius √(a²+b²+c²−d²)/|c+d|, or a line if N ∈ C.
import { ref, watch } from 'vue'
import { circleOnSphere, fmt, phi, sph, type V3 } from './lib/geom'
import { COL, sphereView, useBoard, usePlayer } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '270px' } })
const el = ref<HTMLElement | null>(null)
const tilt = ref(0.9)
const azim = ref(0.4)
const h = ref(-0.2)
const playing = ref(false)
const readout = ref('')

const n = () => sph(azim.value, tilt.value)
const circ = () => circleOnSphere(n(), h.value, 240)
const B = useBoard(el, [-3.6, 3.6, 3.6, -3.6], {}, (board) => {
  const S = sphereView(board)
  for (let k = 0; k < 6; k++) S.cappedRay(() => circ()[k * 40], COL.dim, 2).setAttribute({ strokeWidth: 0.8 })
  S.scurve(circ, { strokeColor: COL.coral, strokeWidth: 2.6 })
  S.scurve(() => circ().map((x) => { const q = phi(x); return [q[0], q[1], 0] as V3 }), { strokeColor: COL.emerald, strokeWidth: 2.6 }, true)
  board.on('update', () => {
    const [a, b, c] = n(), d = -h.value, cd = c + d
    if (Math.abs(cd) < 1e-3) readout.value = `(a,b,c,d) = (${fmt(a, 2)}, ${fmt(b, 2)}, ${fmt(c, 2)}, ${fmt(d, 2)})   c+d = 0 ⇒ N ∈ C ⇒ Φ(C): garis 2au + 2bv = c − d`
    else readout.value = `(a,b,c,d) = (${fmt(a, 2)}, ${fmt(b, 2)}, ${fmt(c, 2)}, ${fmt(d, 2)})   c+d = ${fmt(cd, 3)}   ⇒ Φ(C): pusat (${fmt(-a / cd, 2)}, ${fmt(-b / cd, 2)}), r = ${fmt(Math.sqrt(1 - d * d) / Math.abs(cd), 3)}`
  })
  board.update()
})
watch([tilt, azim, h], () => B.update())
const throughN = () => { h.value = n()[2] }
const player = usePlayer((t) => {
  azim.value = (0.4 + 0.35 * t) % (2 * Math.PI)
  h.value = -0.2 + 0.7 * Math.sin(0.5 * t)
})
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶' }}</button>
      <span style="color: var(--fg-dim)">miring</span><input v-model.number="tilt" type="range" min="0" max="3.14" step="0.01" style="width: 62px" />
      <span style="color: var(--fg-dim)">arah</span><input v-model.number="azim" type="range" min="0" max="6.28" step="0.01" style="width: 62px" />
      <span style="color: var(--fg-dim)">h</span><input v-model.number="h" type="range" min="-0.95" max="0.95" step="0.001" style="width: 62px" />
      <button class="jxg-btn" @click="throughN">C ∋ N</button>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
