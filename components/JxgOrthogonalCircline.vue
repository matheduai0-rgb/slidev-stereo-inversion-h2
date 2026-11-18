<script setup lang="ts">
// Akibat 3.12 + Lemma 3.15: I_C maps circlines to circlines; Γ ⊥ C ⇔ I_C(Γ) = Γ.
import { ref, watch } from 'vue'
import { angleBetween, asCircline, circleC, fmt, imageCircline, inv, len, sampleCircline, sub, type Circline, type V2 } from './lib/geom'
import { COL, dragPoint, pcurve, useBoard, GGB2D } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '270px' } })
const el = ref<HTMLElement | null>(null)
const r = ref(1.3)
const s = ref(0.9)
const readout = ref('')

let qP: any, G: any
const C = () => circleC([qP.X(), qP.Y()], r.value)
const Gam = (): Circline => ({ type: 'circle', c: [G.X(), G.Y()], s: s.value })
const B = useBoard(el, [-4, 4, 4, -4], GGB2D, (board) => {
  qP = dragPoint(board, [-0.4, 0.1], 'q', COL.emerald)
  G = dragPoint(board, [1.8, -1.4], 'Γ', COL.amber)
  pcurve(board, () => sampleCircline(asCircline(C()), 300), { strokeColor: COL.emerald, strokeWidth: 2.4 })
  pcurve(board, () => sampleCircline(Gam(), 300), { strokeColor: COL.amber, strokeWidth: 2.2 })
  pcurve(board, () => sampleCircline(Gam(), 900).map((x) => inv(C(), x)), { strokeColor: COL.coral, strokeWidth: 4, strokeOpacity: 0.45 })
  pcurve(board, () => sampleCircline(imageCircline(C(), Gam()), 300), { strokeColor: COL.coral, strokeWidth: 1.4, dash: 3 })
  board.on('update', () => {
    const E = imageCircline(C(), Gam()), a = angleBetween(Gam(), asCircline(C()))
    const img = E.type === 'circle' ? `lingkaran pusat (${fmt(E.c[0], 2)}, ${fmt(E.c[1], 2)}), r = ${fmt(E.s, 3)}` : 'garis (Γ melalui q)'
    readout.value = `I_C(Γ): ${img}   ·   ∠(Γ, C) = ${a === null ? '— (tak berpotongan)' : a.toFixed(2) + '°'}` + (a !== null && Math.abs(a - 90) < 0.05 ? '  ⇒ I_C(Γ) = Γ' : '')
  })
  board.update()
})
watch([r, s], () => B.update())
function makeOrtho() {
  const D = len(sub([G.X(), G.Y()] as V2, [qP.X(), qP.Y()] as V2))
  if (D > r.value) s.value = Math.min(3, Math.sqrt(D * D - r.value * r.value))
}
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span style="color: var(--fg-dim)">r (C)</span><input v-model.number="r" type="range" min="0.5" max="2.5" step="any" style="width: 70px" />
      <span style="color: var(--fg-dim)">jari-jari Γ</span><input v-model.number="s" type="range" min="0.1" max="3" step="any" style="width: 70px" />
      <button class="jxg-btn" @click="makeOrtho">Γ ⊥ C</button>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
