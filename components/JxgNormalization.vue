<script setup lang="ts">
// Lemma 4.8: Γ (semicircle centred on the x-axis) → I_C(Γ) vertical line (C = C_(q,1), q ∈ Γ ∩ x-axis)
// → t_(−c,0) moves it onto the y-axis. Points A, B on Γ are carried along; d_H(A,B) never changes.
import { computed, ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { dH, geodesicArc, invC, tA } from './lib/hyp'
import { COL, fnPoint, GGB2D, pcurve, shadeH2, useBoard, usePlayer } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '290px' } })
const el = ref<HTMLElement | null>(null)
const m = ref(-0.9) // centre of Γ on the x-axis
const rho = ref(0.8) // radius of Γ
const step = ref(3) // 0: Γ, 1: + q and C, 2: + I_C(Γ), 3: + translation to the y-axis
const playing = ref(false)
const readout = ref('')
const STEP_TXT = ['Γ dan titik A, B', 'q ∈ Γ ∩ sumbu-x, C = C₍q,1₎', 'I_C(Γ): garis vertikal', 't₍₋c,0₎ ∘ I_C (Γ) = sumbu-y']
const stepTxt = computed(() => STEP_TXT[step.value])

const q = (): V2 => [m.value + rho.value, 0]
const A = (): V2 => [m.value + rho.value * Math.cos(1.0), rho.value * Math.sin(1.0)]
const Bp = (): V2 => [m.value + rho.value * Math.cos(2.2), rho.value * Math.sin(2.2)]
const IC = (p: V2) => invC(q()[0], 1)(p)
const cLine = () => q()[0] - 1 / (2 * rho.value) // I_C(Γ) is the line x = c
const T = (p: V2) => tA(-cLine())(p)
const semi = (c: number, r: number): V2[] => Array.from({ length: 201 }, (_, i) => [c + r * Math.cos((Math.PI * i) / 200), r * Math.sin((Math.PI * i) / 200)] as V2)
const vline = (x: number): V2[] => [[x, 0], [x, 50]]

const B = useBoard(el, [-2.4, 3, 2.6, -0.3], GGB2D, (board) => {
  shadeH2(board)
  const objs: [any, number][] = []
  const vis = (o: any, k: number) => { objs.push([o, k]) }
  vis(pcurve(board, () => semi(m.value, rho.value), { strokeColor: COL.cyan, strokeWidth: 2.6 }), 0)
  vis(pcurve(board, () => geodesicArc(A(), Bp(), 200), { strokeColor: COL.cyan, strokeWidth: 5, strokeOpacity: 0.35 }), 0)
  vis(fnPoint(board, A, 'A', COL.cyan, 3.5), 0)
  vis(fnPoint(board, Bp, 'B', COL.cyan, 3.5), 0)
  vis(fnPoint(board, q, 'q', COL.coral, 3.5), 1)
  vis(pcurve(board, () => semi(q()[0], 1), { strokeColor: COL.emerald, strokeWidth: 1.8, dash: 2 }), 1)
  vis(pcurve(board, () => vline(cLine()), { strokeColor: COL.amber, strokeWidth: 2.6 }), 2)
  vis(fnPoint(board, () => IC(A()), 'I_C(A)', COL.amber, 3.5), 2)
  vis(fnPoint(board, () => IC(Bp()), 'I_C(B)', COL.amber, 3.5), 2)
  vis(pcurve(board, () => vline(0), { strokeColor: COL.purple, strokeWidth: 3.2, strokeOpacity: 0.8 }), 3)
  vis(fnPoint(board, () => T(IC(A())), 'φ(A)', COL.purple, 3.5), 3)
  vis(fnPoint(board, () => T(IC(Bp())), 'φ(B)', COL.purple, 3.5), 3)
  board.on('update', () => {
    objs.forEach(([o, k]) => o.setAttribute({ visible: step.value >= k }))
    const d0 = dH(A(), Bp()), d1 = dH(IC(A()), IC(Bp())), d2 = dH(T(IC(A())), T(IC(Bp())))
    readout.value = `d_H(A,B) = ${d0.toFixed(5)}` + (step.value >= 2 ? `   d_H(I_C A, I_C B) = ${d1.toFixed(5)}` : '') +
      (step.value >= 3 ? `   d_H(φA, φB) = ${d2.toFixed(5)} = |ln(y_B/y_A)| = ${Math.abs(Math.log(T(IC(Bp()))[1] / T(IC(A()))[1])).toFixed(5)}` : '') +
      (step.value >= 2 ? `   ·  I_C(Γ): x = ${cLine().toFixed(3)}` : '')
  })
  board.update()
})
watch([m, rho, step], () => B.update())
const player = usePlayer((t) => { step.value = Math.floor(t / 1.6) % 4 })
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶' }}</button>
      <span>langkah</span><input v-model.number="step" type="range" min="0" max="3" step="1" style="width: 60px" />
      <span>pusat Γ</span><input v-model.number="m" type="range" min="-1.8" max="1.2" step="0.01" style="width: 65px" />
      <span>jari-jari</span><input v-model.number="rho" type="range" min="0.3" max="1.8" step="0.01" style="width: 65px" />
    </div>
    <div class="jxg-readout"><b style="color: var(--amber-accent)">{{ stepTxt }}</b> &nbsp; {{ readout }}</div>
  </div>
</template>
