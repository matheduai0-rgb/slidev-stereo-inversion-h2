<script setup lang="ts">
// Def. 3.1 / Prop. 3.2: the ray from N through p ∈ S² meets z = 0 at Φ(p).
import { ref, watch } from 'vue'
import { fmt, phi, sph } from './lib/geom'
import { COL, sphereView, useBoard, usePlayer } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '270px' } })
const el = ref<HTMLElement | null>(null)
const theta = ref(0.6)
const colat = ref(1.1)
const playing = ref(false)
const readout = ref('')

const P = () => sph(theta.value, colat.value)
const B = useBoard(el, [-3.6, 3.6, 3.6, -3.6], {}, (board) => {
  const S = sphereView(board)
  S.scurve(() => Array.from({ length: 121 }, (_, i) => { const t = (2 * Math.PI * i) / 120; return [Math.cos(t), Math.sin(t), 0] as any }),
    { strokeColor: COL.cyan, strokeWidth: 1.6, dash: 2 })
  S.cappedRay(P, COL.coral)
  S.pt3(P, 'p', COL.emerald, 4)
  S.pt3(S.onPlane(() => phi(P())), 'Φ(p)', COL.cyan, 4)
  board.on('update', () => {
    const p = P(), q = phi(p)
    readout.value = `p = (${fmt(p[0], 2)}, ${fmt(p[1], 2)}, ${fmt(p[2], 2)})  ↦  Φ(p) = (${fmt(q[0], 2)}, ${fmt(q[1], 2)})   ·   u²+v² = ${fmt(q[0] ** 2 + q[1] ** 2, 3)} = (1+z)/(1−z)`
  })
  board.update()
})
watch([theta, colat], () => B.update())
const player = usePlayer((t) => {
  colat.value = 0.15 + (Math.PI - 0.17) * (0.5 - 0.5 * Math.cos(0.5 * t))
  theta.value = (0.6 + 0.3 * t) % (2 * Math.PI)
})
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶' }}</button>
      <span style="color: var(--fg-dim)">θ</span><input v-model.number="theta" type="range" min="0" max="6.283" step="0.01" style="width: 80px" />
      <span style="color: var(--fg-dim)">φ</span><input v-model.number="colat" type="range" min="0.12" max="3.13" step="0.01" style="width: 80px" />
      <span style="color: var(--fg-dim)">(seret bola untuk memutar)</span>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
