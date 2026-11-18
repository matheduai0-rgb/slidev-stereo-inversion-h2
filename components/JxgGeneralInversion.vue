<script setup lang="ts">
// Def. 3.9: I_C for a circle C_{q,r} or a line (κ → 0 morphs one into the other).
import { ref, watch } from 'vue'
import { add, fmt, inv, len, makeC, mul, sampleC, sub, type V2 } from './lib/geom'
import { COL, dragPoint, fnPoint, pcurve, useBoard, usePlayer, GGB2D } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '270px' } })
const el = ref<HTMLElement | null>(null)
const beta = ref(0.3)
const kappa = ref(-0.7)
const playing = ref(false)
const readout = ref('')

let A: any, p: any
const C = () => makeC([A.X(), A.Y()], beta.value, kappa.value)
const pp = (): V2 => [p.X(), p.Y()]
const B = useBoard(el, [-4, 4, 4, -4], GGB2D, (board) => {
  A = dragPoint(board, [1, 0.5], 'A', COL.emerald)
  p = dragPoint(board, [2.2, 1.2], 'p', COL.amber)
  pcurve(board, () => sampleC(C()), { strokeColor: COL.emerald, strokeWidth: 2.6 })
  fnPoint(board, () => { const c = C(); return c.line ? [NaN, NaN] : c.q }, 'q', COL.fg, 2.5)
  pcurve(board, () => { const c = C(), x = pp(); if (c.line) return [x, inv(c, x)]
    const d = sub(x, c.q), l = len(d); return l < 1e-9 ? [] : [c.q, add(c.q, mul(d, 40 / l))] }, { strokeColor: COL.cyan, strokeWidth: 1.2, dash: 2 })
  fnPoint(board, () => inv(C(), pp()), 'I_C(p)', COL.coral, 4)
  board.on('update', () => {
    const c = C(), x = pp(), I = inv(c, x)
    readout.value = c.line
      ? `C = garis (κ = 0):  I_C = r̄_L,   I_C(p) = (${fmt(I[0], 2)}, ${fmt(I[1], 2)})`
      : `C = C_{q,r}: q = (${fmt(c.q[0], 2)}, ${fmt(c.q[1], 2)}), r = ${fmt(c.r, 2)}   |p−q|·|I_C(p)−q| = ${fmt(len(sub(x, c.q)) * len(sub(I, c.q)), 4)} = r² = ${fmt(c.r * c.r, 4)}`
  })
  board.update()
})
watch([beta, kappa], () => B.update())
let k0 = 0
const player = usePlayer((t) => { if (t < 0.02) k0 = Math.acos(Math.max(-1, Math.min(1, kappa.value))); kappa.value = Math.cos(0.45 * t + k0) })
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶ κ → 0' }}</button>
      <span style="color: var(--fg-dim)">arah β</span><input v-model.number="beta" type="range" min="0" max="6.283" step="0.01" style="width: 70px" />
      <span style="color: var(--fg-dim)">κ = ±1/r</span><input v-model.number="kappa" type="range" min="-1.2" max="1.2" step="0.001" style="width: 90px" />
      <span>{{ kappa.toFixed(2) }}</span>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
