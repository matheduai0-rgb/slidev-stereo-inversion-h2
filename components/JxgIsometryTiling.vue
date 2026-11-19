<script setup lang="ts">
// Iso⁺(H²) through two inversions (Lee 4.3, Latihan 4.7–4.8): φ = I_M ∘ I_L is a rotation when L, M meet,
// a parallel displacement when they meet only at an ideal point ξ, a translation when they are ultraparallel.
// The {p,q} tiling is cut into (2,p,q) triangles in two tones; inversions (det −1) swap the tones.
// Ported from animations/jsxgraph/hyperbolic_isometries_tiling.html.
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { V2 } from './lib/geom'
import { dH, sampleHLine, type HLine } from './lib/hyp'
import {
  apply, baseGeom, classify, compose, conj, dilIso, drawTiles, fmt, geodesicThrough, ID, invIso, lineImage, norm,
  rotAbout, rotI, shift, tiles, toPoint, type Geom, type Iso, type Tri, type View,
} from './lib/hiso'
import { COL, dragPointH, fnPoint, GGB2D, pcurve, shadeH2, useBoard, usePlayer } from './lib/jxg'

type Mode = 'rot' | 'par' | 'tra' | 'inv'
const props = defineProps({
  height: { type: String, default: '300px' },
  mode: { type: String as () => Mode, default: 'rot' },
})
const el = ref<HTMLElement | null>(null)
const cv = ref<HTMLCanvasElement | null>(null)
const mode = ref<Mode>(props.mode)
const par = reactive<Record<Mode, number>>({ rot: 0.6, par: 0.8, tra: 0.7, inv: 0 })
const period = reactive<{ rot: number; tra: number | null; inv: number }>({ rot: 2 * Math.PI, tra: null, inv: Math.PI })
const step = ref(2)
const inf = ref(false)
const ghost = ref(false)
const mirrors = ref(true)
const pq = ref('4,5')
const playing = ref(false)
const readout = ref('')
let G: Geom = baseGeom(4, 5)

const RANGE: Record<Mode, { min: number; max: number; lbl: string }> = {
  rot: { min: 0, max: 2 * Math.PI, lbl: 'θ' },
  par: { min: -4, max: 4, lbl: 's' },
  tra: { min: -3, max: 3, lbl: 'ℓ' },
  inv: { min: 0, max: Math.PI, lbl: 'α' },
}
const parTxt = computed(() => (mode.value === 'rot' || mode.value === 'inv' ? `${((par[mode.value] * 180) / Math.PI).toFixed(1)}°` : par[mode.value].toFixed(3)))

let P0: any, XI: any, A1: any, A2: any, B1: any, B2: any, X: any
const pt = (P: any): V2 => [P.X(), P.Y()]

/** translation axis a₁a₂ with S(0) = e₁, S(∞) = e₂ (e₁ < e₂); sgn = direction a₁ → a₂ */
function axisFrame(): { A: HLine; S: Iso; sgn: number } {
  const a1 = pt(A1), a2 = pt(A2), A = geodesicThrough(a1, a2)
  if (A.type === 'v') return { A, S: { m: [1, A.x, 0, 1], r: false }, sgn: a2[1] > a1[1] ? 1 : -1 }
  const e1 = A.c - A.R, e2 = A.c + A.R, ang = (z: V2) => Math.atan2(z[1], z[0] - A.c)
  return { A, S: norm({ m: [e2, e1, 1, 1], r: false }), sgn: ang(a2) < ang(a1) ? 1 : -1 }
}
const parFrame = (): Iso => (inf.value ? ID : { m: [XI.X(), -1, 1, 0], r: false }) // ∞ ↦ ξ

/** φ = I_M ∘ I_L for the three orientation-preserving modes; I_{L_α} for inversion */
function model(m: Mode, t: number): { phi: Iso; L: HLine; M: HLine | null } {
  if (m === 'rot') {
    const S = toPoint(pt(P0)), L0: HLine = { type: 'v', x: 0 }
    return { phi: conj(S, rotI(t)), L: lineImage(S, L0), M: lineImage(S, lineImage(rotI(t / 2), L0)) }
  }
  if (m === 'par') {
    const T = parFrame()
    return { phi: conj(T, shift(t)), L: lineImage(T, { type: 'v', x: 0 }), M: lineImage(T, { type: 'v', x: t / 2 }) }
  }
  if (m === 'tra') {
    const F = axisFrame(), l = F.sgn * t
    return { phi: conj(F.S, dilIso(l)), L: lineImage(F.S, { type: 'c', c: 0, R: 1 }), M: lineImage(F.S, { type: 'c', c: 0, R: Math.exp(l / 2) }) }
  }
  const L = lineImage(rotAbout(pt(B1), t), geodesicThrough(pt(B1), pt(B2)))
  return { phi: invIso(L), L, M: null }
}
const current = () => model(mode.value, par[mode.value])
function shown(): Iso {
  const c = current()
  if (mode.value === 'inv') return c.phi
  return step.value === 2 ? c.phi : step.value === 1 ? invIso(c.L) : ID
}

/* ---------- canvas ---------- */
const COLOURS = { tA: '#ffffff', tB: '#dbe5f3', edge: '#212121', lower: '#eeeeee', hl: 'rgba(239,108,0,0.33)', ghost: 'rgba(211,47,47,0.7)' }
let ghostCache: { key: string; tris: Tri[] } = { key: '', tris: [] }
let lastCount = 0
function draw(board: any) {
  const c = cv.value
  if (!c || !el.value) return
  const w = el.value.clientWidth, h = el.value.clientHeight
  if (!w || !h) return
  const scale = el.value.getBoundingClientRect().width / w || 1 // Slidev scales slides with a CSS transform
  const dpr = (window.devicePixelRatio || 1) * scale
  const W = Math.round(w * dpr), H = Math.round(h * dpr)
  if (c.width !== W || c.height !== H) { c.width = W; c.height = H }
  const V: View = { ox: board.origin.scrCoords[1] * dpr, oy: board.origin.scrCoords[2] * dpr, ux: board.unitX * dpr, uy: board.unitY * dpr, W, H, dpr }
  if (![V.ox, V.oy, V.ux].every(Number.isFinite)) return
  const bb = board.getBoundingBox(), phi = shown()
  const tris = tiles(G, phi, V, bb, 3.5 * dpr)
  lastCount = tris.length
  let gh: Tri[] | null = null
  if (ghost.value) {
    const key = [bb.map((v: number) => v.toFixed(4)), G.p, G.q, W, H].join('|')
    if (ghostCache.key !== key) ghostCache = { key, tris: tiles(G, ID, V, bb, 4 * dpr) }
    gh = ghostCache.tris
  }
  drawTiles(c.getContext('2d')!, V, G, phi, tris, COLOURS, gh)
}

function updateReadout() {
  const g = norm(shown()), [a, b, c, d] = g.m, w = g.r ? 'z̄' : 'z', x = pt(X), K = classify(g)
  let line2 = `${K.extra ? K.extra + '  ·  ' : ''}d_H(x, φx) = ${fmt(dH(x, apply(g, x)), 4)}`
  if (mode.value !== 'inv') {
    const cm = current(), IMIL = compose(invIso(cm.M!), invIso(cm.L))
    const e = Math.max(...([[0.3, 0.7], [-1.1, 2.0], x] as V2[]).map((z) => Math.hypot(apply(IMIL, z)[0] - apply(cm.phi, z)[0], apply(IMIL, z)[1] - apply(cm.phi, z)[1])))
    line2 += `  ·  |I_M∘I_L − φ| ≤ ${e.toExponential(0)}`
  }
  readout.value = `φ(${w}) = (${fmt(a, 3)}${w} + ${fmt(b, 3)}) / (${fmt(c, 3)}${w} + ${fmt(d, 3)})  ·  tr = ${fmt(a + d, 3)}  ·  ${K.name}\n${line2}  ·  ${lastCount} segitiga`
}

const B = useBoard(el, [-3.2, 3.3, 3.2, -0.3], { ...GGB2D, grid: false }, (board) => {
  shadeH2(board)
  P0 = dragPointH(board, [0.9, 1.3], 'p₀', 0.03)
  const axisLine = board.create('line', [[0, 0], [1, 0]], { visible: false })
  XI = board.create('glider', [0.8, 0, axisLine], {
    name: 'ξ', size: 4, fillColor: COL.blue, strokeColor: '#1a1a1a', strokeWidth: 1.2, showInfobox: false,
    label: { strokeColor: COL.blue, fontSize: 14, offset: [7, 7] },
  })
  A1 = dragPointH(board, [-1.2, 1.1], 'a₁', 0.03); A2 = dragPointH(board, [0.9, 1.8], 'a₂', 0.03)
  B1 = dragPointH(board, [-0.6, 1.0], 'b₁', 0.03); B2 = dragPointH(board, [1.0, 1.9], 'b₂', 0.03)
  X = dragPointH(board, [1.6, 1.2], 'x', 0.03)
  P0.on('drag', () => { period.rot = 2 * Math.PI })
  A1.on('drag', () => { period.tra = null }); A2.on('drag', () => { period.tra = null })
  B1.on('drag', () => { par.inv = 0 }); B2.on('drag', () => { par.inv = 0 })

  pcurve(board, () => (mirrors.value ? sampleHLine(current().L, 200) : []), { strokeColor: COL.coral, strokeWidth: 2.4, dash: 2 })
  pcurve(board, () => { const M = current().M; return mirrors.value && M ? sampleHLine(M, 200) : [] }, { strokeColor: COL.blue, strokeWidth: 2.4 })
  pcurve(board, () => (mode.value === 'tra' ? sampleHLine(axisFrame().A, 240) : []), { strokeColor: COL.emerald, strokeWidth: 2.4 })
  pcurve(board, () => {
    if (mode.value === 'inv') return []
    const x = pt(X), out: V2[] = []
    for (let k = 0; k <= 240; k++) {
      const u = k / 240
      const t = mode.value === 'rot' ? 2 * Math.PI * u : mode.value === 'par' ? (40 * Math.sinh(6 * (2 * u - 1))) / Math.sinh(6) : 12 * (2 * u - 1)
      out.push(apply(model(mode.value, t).phi, x))
    }
    return out
  }, { strokeColor: COL.purple, strokeWidth: 1.6, dash: 1 })
  pcurve(board, () => {
    const x = pt(X), y = apply(shown(), x), L = geodesicThrough(x, y)
    if (L.type === 'v') return [x, y]
    const a0 = Math.atan2(x[1], x[0] - L.c), a1 = Math.atan2(y[1], y[0] - L.c)
    return Array.from({ length: 61 }, (_, k) => { const a = a0 + ((a1 - a0) * k) / 60; return [L.c + L.R * Math.cos(a), L.R * Math.sin(a)] as V2 })
  }, { strokeColor: COL.purple, strokeWidth: 1.2, dash: 2 })
  fnPoint(board, () => apply(shown(), pt(X)), 'φ(x)', COL.purple, 4, { fillOpacity: 0.25, strokeWidth: 2 })

  board.on('update', () => { draw(board); updateReadout() })
  setVisibility()
  board.update()
})

function setVisibility() {
  if (!P0) return
  const m = mode.value
  P0.setAttribute({ visible: m === 'rot' })
  XI.setAttribute({ visible: m === 'par' && !inf.value })
  A1.setAttribute({ visible: m === 'tra' }); A2.setAttribute({ visible: m === 'tra' })
  B1.setAttribute({ visible: m === 'inv' }); B2.setAttribute({ visible: m === 'inv' })
}

/* ---------- snaps: isometries that map the tiling onto itself (plus ξ presets) ---------- */
type Snap = [string, () => void]
const snaps = computed<Snap[]>(() => {
  void pq.value
  if (mode.value === 'rot') return [
    ['pusat ubin 2π/p', () => { P0.moveTo(G.P); period.rot = (2 * Math.PI) / G.p; par.rot = period.rot }],
    ['titik sudut 2π/q', () => { P0.moveTo(G.Q); period.rot = (2 * Math.PI) / G.q; par.rot = period.rot }],
    ['tengah sisi π', () => { P0.moveTo(G.E); period.rot = Math.PI; par.rot = Math.PI }],
  ]
  if (mode.value === 'par') return [
    ['ξ = ∞', () => { inf.value = true }],
    ['ξ = 0', () => { inf.value = false; XI.moveTo([0, 0]) }],
  ]
  if (mode.value === 'tra') return [
    ['sisi berhadapan ℓ = 4a', () => { A1.moveTo([0, 1]); A2.moveTo([0, 2]); period.tra = 4 * G.a; par.tra = 4 * G.a }],
  ]
  return [
    ['cermin sumbu-y', () => { B1.moveTo([0, 1]); B2.moveTo([0, 2]); par.inv = 0 }],
    ['cermin sisi', () => { B1.moveTo(G.E); B2.moveTo(G.Q); par.inv = 0 }],
    ['cermin diagonal', () => { B1.moveTo(G.P); B2.moveTo(G.Q); par.inv = 0 }],
  ]
})
function runSnap(fn: () => void) { fn(); B.update() }

/* ---------- animation ---------- */
let last = 0
const player = usePlayer((t) => {
  const dt = Math.min(0.05, Math.max(0, t - last)); last = t
  const m = mode.value
  if (m === 'rot') par.rot = (par.rot + (dt * period.rot) / 4) % period.rot
  else if (m === 'par') par.par = 3 * Math.sin(0.5 * t)
  else if (m === 'tra') par.tra = period.tra ? (par.tra + (dt * period.tra) / 4) % period.tra : 2.2 * Math.sin(0.45 * t)
  else par.inv = (par.inv + (dt * period.inv) / 7) % period.inv
})
function togglePlay() { last = 0; if (!playing.value) step.value = 2; playing.value = player.toggle() }

watch([mode, inf], () => { setVisibility(); B.update() })
watch([() => par[mode.value], step, ghost, mirrors], () => B.update())
watch(pq, (v) => { const [p, q] = v.split(',').map(Number); G = baseGeom(p, q); ghostCache.key = ''; period.rot = 2 * Math.PI; period.tra = null; B.update() })

// dev-only handle for numerical checks: one entry per mounted instance (pick the visible one)
const api = { get G() { return G }, el, model, shown, tiles, apply, compose, invIso, geodesicThrough, rotAbout, classify, norm, mode, par, step, board: () => B.board(), pts: () => ({ P0, XI, A1, A2, B1, B2, X }) }
onMounted(() => { if (import.meta.env.DEV) ((window as any).__tilings ??= []).push(api) })
onBeforeUnmount(() => { const a = (window as any).__tilings; if (a) a.splice(a.indexOf(api), 1) })
</script>

<template>
  <div class="jxg-card">
    <div class="tiling-stage" :style="{ height: props.height }">
      <canvas ref="cv"></canvas>
      <div ref="el" class="jxgbox"></div>
    </div>
    <div class="jxg-controls">
      <button class="jxg-btn" :class="{ active: playing }" @click="togglePlay">{{ playing ? '⏸' : '▶' }}</button>
      <button class="jxg-btn" :class="{ active: mode === 'rot' }" @click="mode = 'rot'">rotasi</button>
      <button class="jxg-btn" :class="{ active: mode === 'par' }" @click="mode = 'par'">pergeseran paralel</button>
      <button class="jxg-btn" :class="{ active: mode === 'tra' }" @click="mode = 'tra'">translasi</button>
      <button class="jxg-btn" :class="{ active: mode === 'inv' }" @click="mode = 'inv'">inversi</button>
      <span>{{ RANGE[mode].lbl }}</span>
      <input v-model.number="par[mode]" type="range" :min="RANGE[mode].min" :max="RANGE[mode].max" step="any" style="width: 110px" />
      <b style="min-width: 3.6em">{{ parTxt }}</b>
    </div>
    <div class="jxg-controls">
      <button v-for="[txt, fn] in snaps" :key="txt" class="jxg-btn" @click="runSnap(fn)">{{ txt }}</button>
      <select v-if="mode !== 'inv'" v-model.number="step" class="jxg-btn">
        <option :value="2">φ = I_M∘I_L</option>
        <option :value="1">I_L</option>
        <option :value="0">id</option>
      </select>
      <label v-if="mode === 'par'"><input v-model="inf" type="checkbox" /> ξ = ∞</label>
      <select v-model="pq" class="jxg-btn">
        <option value="4,5">{4,5}</option>
        <option value="5,4">{5,4}</option>
        <option value="3,7">{3,7}</option>
        <option value="4,6">{4,6}</option>
      </select>
      <label><input v-model="ghost" type="checkbox" /> ubin asal</label>
      <label><input v-model="mirrors" type="checkbox" /> L, M</label>
    </div>
    <div class="jxg-readout" style="white-space: pre">{{ readout }}</div>
  </div>
</template>

<style scoped>
.tiling-stage { position: relative; width: 100%; }
.tiling-stage canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.tiling-stage .jxgbox { position: absolute; inset: 0; width: 100%; height: 100%; background-color: transparent !important; }
</style>
