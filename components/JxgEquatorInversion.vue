<script setup lang="ts">
// Prop. 3.7: reflection in the equator, r̄_G(x,y,z) = (x,y,−z), induces I(p) = p/|p|².
import { ref, watch } from 'vue'
import { fmt, len, phi, sph, unitInv, type V3 } from './lib/geom'
import { COL, sphereView, useBoard, usePlayer } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '270px' } })
const el = ref<HTMLElement | null>(null)
const theta = ref(0.6)
const colat = ref(1.1)
const playing = ref(false)
const readout = ref('')

const P = () => sph(theta.value, colat.value)
const Pm = (): V3 => { const [x, y, z] = P(); return [x, y, -z] }
const B = useBoard(el, [-3.6, 3.6, 3.6, -3.6], {}, (board) => {
  const S = sphereView(board)
  S.scurve(() => Array.from({ length: 121 }, (_, i) => { const t = (2 * Math.PI * i) / 120; return [Math.cos(t), Math.sin(t), 0] as V3 }),
    { strokeColor: COL.emerald, strokeWidth: 2.2 })
  S.scurve(() => [P(), Pm()], { strokeColor: COL.dim, strokeWidth: 1, dash: 1 })
  S.cappedRay(P, COL.coral)
  S.cappedRay(Pm, COL.amber, 2)
  S.pt3(P, 'P', COL.coral, 4)
  S.pt3(Pm, "P' = r̄_G(P)", COL.amber, 4)
  S.pt3(S.onPlane(() => phi(P())), 'p', COL.coral, 3.5)
  S.pt3(S.onPlane(() => phi(Pm())), 'I(p)', COL.amber, 3.5)
  board.on('update', () => {
    const p = phi(P()), q = phi(Pm()), Ip = unitInv(p)
    readout.value = `p = (${fmt(p[0], 2)}, ${fmt(p[1], 2)})   Φ(P') = (${fmt(q[0], 3)}, ${fmt(q[1], 3)})   p/|p|² = (${fmt(Ip[0], 3)}, ${fmt(Ip[1], 3)})   |p|·|I(p)| = ${(len(p) * len(q)).toFixed(6)}`
  })
  board.update()
})
watch([theta, colat], () => B.update())
const player = usePlayer((t) => {
  colat.value = 0.25 + (Math.PI - 0.5) * (0.5 - 0.5 * Math.cos(0.45 * t))
  theta.value = (0.6 + 0.25 * t) % (2 * Math.PI)
})
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶' }}</button>
      <span style="color: var(--fg-dim)">θ</span><input v-model.number="theta" type="range" min="0" max="6.283" step="0.01" style="width: 80px" />
      <span style="color: var(--fg-dim)">φ</span><input v-model.number="colat" type="range" min="0.15" max="3.0" step="0.01" style="width: 80px" />
      <span style="color: var(--emerald-accent)">ekuator G = lingkaran satuan</span>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
