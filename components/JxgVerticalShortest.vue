<script setup lang="ts">
// Prop. 4.6: γ(t) = (0,t) is the unique shortest path from (0,a) to (0,b); any detour δ is longer.
import { ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { hypLength } from './lib/hyp'
import { COL, fnPoint, GGB2D, pcurve, shadeH2, useBoard } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '280px' } })
const el = ref<HTMLElement | null>(null)
const a = ref(0.5)
const b = ref(2.4)
const bulge = ref(0.8)
const wiggle = ref(0)
const readout = ref('')

const gamma = (): V2[] => Array.from({ length: 1001 }, (_, i) => [0, a.value * Math.pow(b.value / a.value, i / 1000)] as V2)
// detour: sideways bulge plus an optional up-down wiggle (y not monotone)
const delta = (): V2[] => Array.from({ length: 3001 }, (_, i) => {
  const s = i / 3000, y = a.value * Math.pow(b.value / a.value, s) * (1 + wiggle.value * 0.35 * Math.sin(3 * Math.PI * s) * Math.sin(Math.PI * s))
  return [bulge.value * Math.sin(Math.PI * s), y] as V2
})
const B = useBoard(el, [-1.6, 3.1, 1.9, -0.3], GGB2D, (board) => {
  shadeH2(board)
  pcurve(board, gamma, { strokeColor: COL.cyan, strokeWidth: 3.2 })
  pcurve(board, delta, { strokeColor: COL.coral, strokeWidth: 2.2 })
  fnPoint(board, () => [0, a.value], '(0,a)', COL.fg, 3)
  fnPoint(board, () => [0, b.value], '(0,b)', COL.fg, 3)
  board.on('update', () => {
    const lg = hypLength(gamma()), ld = hypLength(delta())
    readout.value = `l_H(δ) = ${ld.toFixed(4)}  ≥  l_H(γ) = ln(b/a) = ${Math.log(b.value / a.value).toFixed(4)}   (selisih ${(ld - lg).toFixed(4)})`
  })
  board.update()
})
watch([a, b, bulge, wiggle], () => { if (b.value <= a.value + 0.05) b.value = a.value + 0.05; B.update() })
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span>a</span><input v-model.number="a" type="range" min="0.1" max="1.5" step="0.01" style="width: 60px" />
      <span>b</span><input v-model.number="b" type="range" min="0.5" max="2.9" step="0.01" style="width: 60px" />
      <span>simpangan x′</span><input v-model.number="bulge" type="range" min="-1.2" max="1.2" step="0.01" style="width: 70px" />
      <span>y naik-turun</span><input v-model.number="wiggle" type="range" min="0" max="1" step="0.01" style="width: 60px" />
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
