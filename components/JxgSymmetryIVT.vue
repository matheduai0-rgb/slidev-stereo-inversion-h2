<script setup lang="ts">
// Lemma 4.15 (Lee Fig. 4.8): on the geodesic Γ through p1, p2 (endpoints q1 < q2) the height difference
// f(α) = π_y(I_{C_(α,1)} p1) − π_y(I_{C_(α,1)} p2) changes sign on [q1, q2]; at the root α₀ a horizontal
// translation makes the images symmetric about the y-axis. Case 2 (Γ vertical) first applies I_{C_(x₁+1,1)}.
import { ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { geodesic, invC, sampleHLine, tA } from './lib/hyp'
import { COL, dragPointH, fnPoint, GGB2D, pcurve, shadeH2, useBoard } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '250px' } })
const el = ref<HTMLElement | null>(null)
const elF = ref<HTMLElement | null>(null)
const u = ref(0.25) // α = q1 + u (q2 − q1)
const showT = ref(false)
const readout = ref('')

let P1: any, P2: any
const raw = (): [V2, V2] => [[P1.X(), P1.Y()], [P2.X(), P2.Y()]]
/** Case 2: a vertical Γ is first sent to a semicircle by I_{C_(x₁+1,1)} */
const pre = (): ((p: V2) => V2) => { const [a, b] = raw(); return Math.abs(a[0] - b[0]) < 1e-6 ? invC(a[0] + 1, 1) : (p) => p }
const pts = (): [V2, V2] => { const f = pre(), [a, b] = raw(); return [f(a), f(b)] }
const Gam = () => { const [a, b] = pts(); const g = geodesic(a, b); return g.type === 'c' ? g : { type: 'c' as const, c: a[0], R: 1 } }
const ends = (): [number, number] => { const g = Gam(); return [g.c - g.R, g.c + g.R] }
const alphaOf = (v: number) => { const [q1, q2] = ends(); return q1 + v * (q2 - q1) }
const f = (al: number) => { const [a, b] = pts(); return invC(al, 1)(a)[1] - invC(al, 1)(b)[1] }
/** IVT root by bisection on [q1, q2] */
function root(): number {
  let [lo, hi] = ends(); let flo = f(lo)
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2, fm = f(m); if (Math.sign(fm) === Math.sign(flo)) { lo = m; flo = fm } else hi = m }
  return (lo + hi) / 2
}
const al = () => alphaOf(u.value)
const imgs = (): [V2, V2] => { const [a, b] = pts(), I = invC(al(), 1); return [I(a), I(b)] }
const shift = () => { const [a, b] = imgs(); return -(a[0] + b[0]) / 2 }
const sym = (): [V2, V2] => { const T = tA(shift()), [a, b] = imgs(); return [T(a), T(b)] }
const isCase2 = () => Math.abs(P1.X() - P2.X()) < 1e-6

const B = useBoard(el, [-3, 3.4, 3, -0.3], GGB2D, (board) => {
  shadeH2(board)
  P1 = dragPointH(board, [-0.9, 0.75], 'p₁')
  P2 = dragPointH(board, [0.75, 0.9], 'p₂')
  pcurve(board, () => sampleHLine(Gam(), 300), { strokeColor: COL.cyan, strokeWidth: 2.2 })
  fnPoint(board, () => [ends()[0], 0], 'q₁', COL.emerald, 2.5)
  fnPoint(board, () => [ends()[1], 0], 'q₂', COL.coral, 2.5)
  fnPoint(board, () => [al(), 0], 'α', COL.fg, 3)
  pcurve(board, () => Array.from({ length: 101 }, (_, i) => [al() + Math.cos((Math.PI * i) / 100), Math.sin((Math.PI * i) / 100)] as V2), { strokeColor: COL.dim, strokeWidth: 1.2, dash: 2 })
  pcurve(board, () => sampleHLine(Gam(), 600).map(invC(al(), 1)), { strokeColor: COL.amber, strokeWidth: 1.6, dash: 1 })
  fnPoint(board, () => imgs()[0], 'I(p₁)', COL.amber, 3.5)
  fnPoint(board, () => imgs()[1], 'I(p₂)', COL.amber, 3.5)
  pcurve(board, () => [[-10, imgs()[0][1]], [10, imgs()[0][1]]], { strokeColor: COL.amber, strokeWidth: 0.8, dash: 2 })
  pcurve(board, () => [[-10, imgs()[1][1]], [10, imgs()[1][1]]], { strokeColor: COL.amber, strokeWidth: 0.8, dash: 2 })
  const s1 = fnPoint(board, () => sym()[0], 'φ(p₁)', COL.purple, 4)
  const s2 = fnPoint(board, () => sym()[1], 'φ(p₂)', COL.purple, 4)
  board.on('update', () => {
    s1.setAttribute({ visible: showT.value }); s2.setAttribute({ visible: showT.value })
    const [q1, q2] = ends(), r = root(), [a, b] = sym()
    readout.value = (isCase2() ? 'Kasus 2 (Γ vertikal): dulu I_{C(x₁+1,1)}.  ' : '') +
      `f(q₁) = ${f(q1).toFixed(3)}  f(q₂) = ${f(q2).toFixed(3)}  ·  f(α) = ${f(al()).toFixed(4)}  ·  α₀ = ${r.toFixed(4)}` +
      (showT.value ? `  ·  φ(p₁) = (${a[0].toFixed(3)}, ${a[1].toFixed(3)}), φ(p₂) = (${b[0].toFixed(3)}, ${b[1].toFixed(3)})` : '')
  })
  board.update()
})
// graph of f on [q1, q2]
const G = useBoard(elF, [-0.08, 3, 1.08, -3], { axis: false, keepaspectratio: false }, (board) => {
  board.create('line', [[0, 0], [1, 0]], { strokeColor: COL.axis, strokeWidth: 1, highlight: false, fixed: true })
  const scale = () => { let m = 0; for (let i = 0; i <= 40; i++) m = Math.max(m, Math.abs(f(alphaOf(i / 40)))); return m > 0 ? 2.6 / m : 1 }
  pcurve(board, () => { const k = scale(); return Array.from({ length: 201 }, (_, i) => [i / 200, k * f(alphaOf(i / 200))] as V2) }, { strokeColor: COL.purple, strokeWidth: 2.2 })
  fnPoint(board, () => [u.value, scale() * f(al())], '', COL.fg, 3)
  fnPoint(board, () => { const [q1, q2] = ends(); return [(root() - q1) / (q2 - q1), 0] }, 'α₀', COL.coral, 3)
  board.create('text', [0.02, 2.7, 'f(α)'], { fontSize: 13, strokeColor: COL.purple, fixed: true, highlight: false })
  board.create('text', [-0.06, -0.35, 'q₁'], { fontSize: 12, strokeColor: COL.emerald, fixed: true, highlight: false })
  board.create('text', [0.98, -0.35, 'q₂'], { fontSize: 12, strokeColor: COL.coral, fixed: true, highlight: false })
  board.update()
})
const both = () => { B.update(); G.update() }
watch([u, showT], both)
function toRoot() { const [q1, q2] = ends(); u.value = (root() - q1) / (q2 - q1); both() }
function onDrag() { both() }
</script>

<template>
  <div class="jxg-card">
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 6px" @pointermove="onDrag">
      <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
      <div ref="elF" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    </div>
    <div class="jxg-controls">
      <span>α ∈ [q₁, q₂]</span><input v-model.number="u" type="range" min="0" max="1" step="any" style="width: 90px" />
      <button class="jxg-btn" @click="toRoot">α = α₀ (IVT)</button>
      <button class="jxg-btn" :class="{ active: showT }" @click="showT = !showT">terapkan translasi t</button>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
