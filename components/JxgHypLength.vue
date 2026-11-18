<script setup lang="ts">
// Def. 4.1 examples: vertical segment (0,a)→(0,b) has l_H = ln(b/a); horizontal (a,c)→(b,c) has (b−a)/c.
import { ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { hypLength } from './lib/hyp'
import { COL, fnPoint, GGB2D, pcurve, shadeH2, useBoard } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '260px' } })
const el = ref<HTMLElement | null>(null)
const a = ref(0.5)
const b = ref(2.4)
const c = ref(1.0)
const readout = ref('')

const vert = (): V2[] => Array.from({ length: 2001 }, (_, i) => [0, a.value + ((b.value - a.value) * i) / 2000] as V2)
const hor = (): V2[] => Array.from({ length: 2001 }, (_, i) => [a.value + ((b.value - a.value) * i) / 2000, c.value] as V2)
const B = useBoard(el, [-0.8, 3.2, 3.6, -0.3], GGB2D, (board) => {
  shadeH2(board)
  pcurve(board, vert, { strokeColor: COL.cyan, strokeWidth: 3 })
  pcurve(board, hor, { strokeColor: COL.coral, strokeWidth: 3 })
  fnPoint(board, () => [0, a.value], '(0,a)', COL.cyan, 3)
  fnPoint(board, () => [0, b.value], '(0,b)', COL.cyan, 3)
  fnPoint(board, () => [a.value, c.value], '(a,c)', COL.coral, 3)
  fnPoint(board, () => [b.value, c.value], '(b,c)', COL.coral, 3)
  board.on('update', () => {
    readout.value = `γ₁ vertikal: ∫ = ${hypLength(vert()).toFixed(4)},  ln(b/a) = ${Math.log(b.value / a.value).toFixed(4)}   ·   γ₂ horizontal: ∫ = ${hypLength(hor()).toFixed(4)},  (b−a)/c = ${((b.value - a.value) / c.value).toFixed(4)}`
  })
  board.update()
})
watch([a, b, c], () => { if (b.value <= a.value + 0.05) b.value = a.value + 0.05; B.update() })
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span>a</span><input v-model.number="a" type="range" min="0.05" max="2" step="0.01" style="width: 80px" />
      <span>b</span><input v-model.number="b" type="range" min="0.2" max="3" step="0.01" style="width: 80px" />
      <span>c</span><input v-model.number="c" type="range" min="0.1" max="2.8" step="0.01" style="width: 80px" />
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
