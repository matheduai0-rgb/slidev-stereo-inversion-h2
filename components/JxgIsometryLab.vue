<script setup lang="ts">
// Def. 4.2, Ex. 4.1–4.3, Prop. 4.3, Thm 4.4: compare l_H(γ) with l_H(φ(γ)) for several maps φ.
import { computed, ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { bezier, dil, eucLength, hypLength, invC, reflL, tA, unitInv, vShift } from './lib/hyp'
import { COL, dragPointH, GGB2D, pcurve, shadeH2, useBoard } from './lib/jxg'

type MapKey = 't' | 'rL' | 'dr' | 'I' | 'IC' | 'vs'
const props = defineProps({ height: { type: String, default: '260px' }, map: { type: String, default: 't' } })
const el = ref<HTMLElement | null>(null)
const mapKey = ref<MapKey>(props.map as MapKey)
const s1 = ref(0.8)
const s2 = ref(1.4)
const readout = ref('')

const MAPS: Record<MapKey, { label: string; p1: string; r1: [number, number]; p2?: string; r2?: [number, number]; iso: boolean }> = {
  t: { label: 't₍ₐ,₀₎', p1: 'a', r1: [-2, 2], iso: true },
  rL: { label: 'r̄_L', p1: 'L: x = a', r1: [-1.5, 1.5], iso: true },
  dr: { label: 'd_r', p1: 'r', r1: [0.3, 2.2], iso: true },
  I: { label: 'I', p1: '', r1: [0, 1], iso: true },
  IC: { label: 'I_C', p1: 'pusat (c,0)', r1: [-1.5, 1.5], p2: 'jari-jari r', r2: [0.3, 2], iso: true },
  vs: { label: '(x, y+b)', p1: 'b', r1: [0, 1.5], iso: false },
}
const info = computed(() => MAPS[mapKey.value])
function phiFn(): (p: V2) => V2 {
  switch (mapKey.value) {
    case 't': return tA(s1.value)
    case 'rL': return reflL(s1.value)
    case 'dr': return dil(s1.value)
    case 'I': return unitInv
    case 'IC': return invC(s1.value, s2.value)
    default: return vShift(s1.value)
  }
}
function setMap(k: MapKey) {
  mapKey.value = k
  const d: Record<MapKey, [number, number]> = { t: [0.8, 1.4], rL: [0.2, 1.4], dr: [1.6, 1.4], I: [0, 1], IC: [0.3, 1.2], vs: [0.6, 1.4] }
  ;[s1.value, s2.value] = d[k]
}
setMap(mapKey.value)

let P0: any, P1: any, P2: any
const gamma = (): V2[] => bezier([P0.X(), P0.Y()], [P1.X(), P1.Y()], [P2.X(), P2.Y()], 1500)
const B = useBoard(el, [-3, 3.1, 3, -0.3], GGB2D, (board) => {
  shadeH2(board)
  // mirror / reference object for the current map
  pcurve(board, () => {
    const k = mapKey.value
    if (k === 'rL') return [[s1.value, 0], [s1.value, 50]] as V2[]
    if (k === 'I' || k === 'IC') {
      const c = k === 'I' ? 0 : s1.value, r = k === 'I' ? 1 : s2.value
      return Array.from({ length: 121 }, (_, i) => [c + r * Math.cos((Math.PI * i) / 120), r * Math.sin((Math.PI * i) / 120)] as V2)
    }
    return []
  }, { strokeColor: COL.emerald, strokeWidth: 2, dash: 2 })
  P0 = dragPointH(board, [-1.6, 0.5], 'γ(a)')
  P1 = dragPointH(board, [-0.6, 2.2], '')
  P2 = dragPointH(board, [0.6, 0.9], 'γ(b)')
  P1.setAttribute({ size: 3, fillOpacity: 0.6 })
  pcurve(board, gamma, { strokeColor: COL.accent, strokeWidth: 3 })
  pcurve(board, () => gamma().map(phiFn()), { strokeColor: COL.coral, strokeWidth: 3 })
  board.on('update', () => {
    const g = gamma(), h = g.map(phiFn()), lg = hypLength(g), lh = hypLength(h)
    const same = Math.abs(lg - lh) < 1e-3 * Math.max(1, lg)
    readout.value = `l_H(γ) = ${lg.toFixed(4)}   l_H(φ(γ)) = ${lh.toFixed(4)}  ${same ? '✓ sama' : '✗ berbeda'}   ·   Euklides: ${eucLength(g).toFixed(3)} vs ${eucLength(h).toFixed(3)}`
  })
  board.update()
})
watch([mapKey, s1, s2], () => B.update())
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span>φ =</span>
      <button v-for="(m, k) in MAPS" :key="k" class="jxg-btn" :class="{ active: mapKey === k }" @click="setMap(k as MapKey)">{{ m.label }}</button>
    </div>
    <div class="jxg-controls">
      <template v-if="info.p1"><span>{{ info.p1 }}</span><input v-model.number="s1" type="range" :min="info.r1[0]" :max="info.r1[1]" step="0.01" style="width: 90px" /><span>{{ s1.toFixed(2) }}</span></template>
      <template v-if="info.p2"><span>{{ info.p2 }}</span><input v-model.number="s2" type="range" :min="info.r2![0]" :max="info.r2![1]" step="0.01" style="width: 80px" /><span>{{ s2.toFixed(2) }}</span></template>
      <span style="color: var(--fg-dim)">seret titik biru untuk mengubah γ</span>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
