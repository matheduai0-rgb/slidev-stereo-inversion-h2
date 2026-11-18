<script setup lang="ts">
// Latihan 3.6: I_{C_{q,r}} = t_q ∘ d_r ∘ I ∘ d_{1/r} ∘ t_{−q}, tweened stage by stage.
import { computed, ref, watch } from 'vue'
import { add, circleC, fin, inv, lerp, mul, sampleCircline, sub, unitInv, type V2 } from './lib/geom'
import { COL, dragPoint, pcurve, useBoard, usePlayer, GGB2D } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '270px' } })
const el = ref<HTMLElement | null>(null)
const r = ref(1.3)
const tau = ref(0)
const playing = ref(false)
const STAGES = ['F', 't₋q F', 'd₁/ᵣ t₋q F', 'I d₁/ᵣ t₋q F', 'd_r I d₁/ᵣ t₋q F', 't_q d_r I d₁/ᵣ t₋q F = I_C(F)']
const stage = computed(() => STAGES[Math.min(5, Math.round(tau.value))])

const SHAPE: V2[] = [[0, 0], [0, 1.2], [0.75, 1.2], [0.75, 1.0], [0.22, 1.0], [0.22, 0.7], [0.6, 0.7], [0.6, 0.5], [0.22, 0.5], [0.22, 0], [0, 0]]
let qP: any, F: any
const q = (): V2 => [qP.X(), qP.Y()]
function figure(): V2[] {
  const o: V2 = [F.X(), F.Y()], pts: V2[] = []
  for (let i = 0; i + 1 < SHAPE.length; i++) for (let k = 0; k < 40; k++) pts.push(add(o, lerp(SHAPE[i], SHAPE[i + 1], k / 40)))
  pts.push(add(o, SHAPE[0]))
  return pts
}
function stages(): V2[][] {
  const s0 = figure(), Q = q(), R = r.value
  const s1 = s0.map((p) => sub(p, Q)), s2 = s1.map((p) => mul(p, 1 / R)), s3 = s2.map(unitInv), s4 = s3.map((p) => mul(p, R)), s5 = s4.map((p) => add(p, Q))
  return [s0, s1, s2, s3, s4, s5]
}
function tween(): V2[] {
  const S = stages(), k = Math.min(4, Math.floor(tau.value)), f = tau.value - k
  return S[k].map((p, i) => (fin(p) && fin(S[k + 1][i]) ? lerp(p, S[k + 1][i], f) : [NaN, NaN]))
}
function mirror(): V2[] {
  const Q = q(), R = r.value, cs: V2[] = [Q, [0, 0], [0, 0], [0, 0], [0, 0], Q], rs = [R, R, 1, 1, R, R]
  const k = Math.min(4, Math.floor(tau.value)), f = tau.value - k
  return sampleCircline({ type: 'circle', c: lerp(cs[k], cs[k + 1], f), s: rs[k] + (rs[k + 1] - rs[k]) * f }, 200)
}
const B = useBoard(el, [-4, 4, 4, -4], GGB2D, (board) => {
  qP = dragPoint(board, [-0.4, 0.1], 'q', COL.emerald)
  F = dragPoint(board, [0.5, -1.6], 'F', COL.amber)
  pcurve(board, () => sampleCircline({ type: 'circle', c: q(), s: r.value }, 200), { strokeColor: COL.emerald, strokeWidth: 2.2 })
  pcurve(board, figure, { strokeColor: COL.amber, strokeWidth: 1.4, strokeOpacity: 0.45 })
  pcurve(board, () => figure().map((p) => inv(circleC(q(), r.value), p)), { strokeColor: COL.coral, strokeWidth: 1.4, dash: 2 })
  pcurve(board, mirror, { strokeColor: COL.cyan, strokeWidth: 1.4, dash: 3 })
  pcurve(board, tween, { strokeColor: COL.amber, strokeWidth: 2.6 })
  board.update()
})
watch([r, tau], () => B.update())
const player = usePlayer((t) => { tau.value = Math.min(5, (0.6 * t) % 6.5) })
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" @click="playing = player.toggle()">{{ playing ? '⏸' : '▶' }}</button>
      <span style="color: var(--fg-dim)">tahap</span><input v-model.number="tau" type="range" min="0" max="5" step="0.01" style="width: 110px" />
      <span style="color: var(--fg-dim)">r</span><input v-model.number="r" type="range" min="0.5" max="2.5" step="0.01" style="width: 60px" />
    </div>
    <div class="jxg-readout"><span style="color: var(--amber-accent)">{{ stage }}</span> &nbsp;·&nbsp; <span style="color: var(--cyan-accent)">- - bayangan C pada tahap ini</span> &nbsp;·&nbsp; <span style="color: var(--coral-accent)">- - target I_C(F)</span></div>
  </div>
</template>
