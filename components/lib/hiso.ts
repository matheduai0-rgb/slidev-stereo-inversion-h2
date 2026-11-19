// Isometries of H² as (anti-)Möbius maps, and the {p,q} tiling by (2,p,q) triangles drawn on a canvas.
// Ported from animations/jsxgraph/hyperbolic_isometries_tiling.html.
import type { V2 } from './geom'
import type { HLine } from './hyp'

/* ---------- isometries ---------- */
/** g = {m:[a,b,c,d], r}: z ↦ (a w + b)/(c w + d), w = r ? z̄ : z, |ad − bc| = 1 (r = true: orientation-reversing) */
export type Iso = { m: [number, number, number, number]; r: boolean }
export const ID: Iso = { m: [1, 0, 0, 1], r: false }
export function norm(g: Iso): Iso {
  const [a, b, c, d] = g.m, s = Math.sqrt(Math.abs(a * d - b * c))
  return { m: [a / s, b / s, c / s, d / s], r: g.r }
}
export function apply(g: Iso, z: V2): V2 {
  const [a, b, c, d] = g.m, w0 = z[0], w1 = g.r ? -z[1] : z[1]
  const n0 = a * w0 + b, n1 = a * w1, d0 = c * w0 + d, d1 = c * w1, s = d0 * d0 + d1 * d1
  return [(n0 * d0 + n1 * d1) / s, (n1 * d0 - n0 * d1) / s]
}
/** f∘g: real matrices multiply, reflection flags add mod 2 */
export function compose(f: Iso, g: Iso): Iso {
  const [a, b, c, d] = f.m, [e, F, G, h] = g.m
  return { m: [a * e + b * G, a * F + b * h, c * e + d * G, c * F + d * h], r: f.r !== g.r }
}
export function inverse(g: Iso): Iso {
  const [a, b, c, d] = g.m, D = a * d - b * c
  return { m: [d / D, -b / D, -c / D, a / D], r: g.r }
}
export const conj = (s: Iso, g: Iso) => compose(compose(s, g), inverse(s))

/* ---------- hyperbolic lines ---------- */
/** geodesic through z1, z2 (relative vertical threshold keeps reflections accurate near vertical lines) */
export function geodesicThrough(z1: V2, z2: V2): HLine {
  const dx = z2[0] - z1[0]
  if (Math.abs(dx) < 1e-7 * (Math.abs(z1[1]) + Math.abs(z2[1]))) return { type: 'v', x: (z1[0] + z2[0]) / 2 }
  const c = (z2[0] * z2[0] + z2[1] * z2[1] - z1[0] * z1[0] - z1[1] * z1[1]) / (2 * dx)
  return { type: 'c', c, R: Math.sqrt((z1[0] - c) ** 2 + z1[1] * z1[1]) }
}
/** I_L as an anti-Möbius isometry (det −1 after normalising) */
export function invIso(L: HLine): Iso {
  if (L.type === 'v') return { m: [-1, 2 * L.x, 0, 1], r: true }
  const { c, R } = L
  return { m: [c / R, (R * R - c * c) / R, 1 / R, -c / R], r: true }
}
export function invertIn(L: HLine, z: V2): V2 {
  if (L.type === 'v') return [2 * L.x - z[0], z[1]]
  const w0 = z[0] - L.c, w1 = z[1], s = (L.R * L.R) / (w0 * w0 + w1 * w1)
  return [L.c + w0 * s, w1 * s]
}
export const sideSign = (L: HLine, z: V2) => (L.type === 'v' ? z[0] - L.x : (z[0] - L.c) ** 2 + z[1] ** 2 - L.R * L.R)
/** image of a geodesic under an isometry: map two of its points and rejoin */
export function lineImage(g: Iso, L: HLine): HLine {
  const pts: V2[] = L.type === 'v' ? [[L.x, 1], [L.x, 2]]
    : [[L.c + L.R * Math.cos(1.0), L.R * Math.sin(1.0)], [L.c + L.R * Math.cos(2.1), L.R * Math.sin(2.1)]]
  return geodesicThrough(apply(g, pts[0]), apply(g, pts[1]))
}

/* ---------- canonical isometries ---------- */
export const rotI = (th: number): Iso => ({ m: [Math.cos(th / 2), Math.sin(th / 2), -Math.sin(th / 2), Math.cos(th / 2)], r: false }) // about i, ccw by th
export const toPoint = (p: V2): Iso => { const s = Math.sqrt(p[1]); return { m: [s, p[0] / s, 0, 1 / s], r: false } } // i ↦ p
export const rotAbout = (p: V2, th: number) => conj(toPoint(p), rotI(th))
export const shift = (s: number): Iso => ({ m: [1, s, 0, 1], r: false })
export const dilIso = (l: number): Iso => ({ m: [Math.exp(l / 2), 0, 0, Math.exp(-l / 2)], r: false })

const f = (v: number, n = 4) => (Math.abs(v) < 5e-13 ? 0 : v).toFixed(n)
const fz = (z: V2) => `${f(z[0], 3)} + ${f(z[1], 3)}i`
/** trace classification of an isometry, with fixed points */
export function classify(g: Iso): { name: string; extra: string } {
  const [a, b, c, d] = norm(g).m
  if (g.r) return { name: 'orientasi terbalik (det = −1): inversi', extra: '' }
  const tr = Math.abs(a + d)
  if (Math.abs(tr - 2) < 1e-7) {
    if (Math.abs(b) < 1e-9 && Math.abs(c) < 1e-9) return { name: 'identitas', extra: '' }
    const xi = Math.abs(c) < 1e-9 ? '∞' : f((a - d) / (2 * c))
    return { name: 'parabolik, |tr| = 2', extra: `ξ = ${xi}` }
  }
  if (tr < 2) {
    const z: V2 = [(a - d) / (2 * c), Math.sqrt(4 - (a + d) ** 2) / (2 * Math.abs(c))]
    return { name: `eliptik, |tr| < 2, sudut ${f((2 * Math.acos(tr / 2) * 180) / Math.PI, 2)}°`, extra: `p₀ = ${fz(z)}` }
  }
  const disc = Math.sqrt((a + d) ** 2 - 4)
  const fx = Math.abs(c) < 1e-9 ? `${f(-b / (a - d))}, ∞` : `${f((a - d - disc) / (2 * c))}, ${f((a - d + disc) / (2 * c))}`
  return { name: `hiperbolik, |tr| > 2, ℓ = ${f(2 * Math.acosh(tr / 2), 4)}`, extra: `titik ideal ${fx}` }
}
export const fmt = f

/* ---------- the {p,q} tiling ---------- */
export type Geom = { p: number; q: number; a: number; rho: number; P: V2; E: V2; Q: V2; sq: V2[] }
/** disk → H, 0 ↦ i:  z ↦ i(1+z)/(1−z) */
function cayley(z: V2): V2 {
  const n: V2 = [-z[1], 1 + z[0]], d: V2 = [1 - z[0], -z[1]], s = d[0] * d[0] + d[1] * d[1]
  return [(n[0] * d[0] + n[1] * d[1]) / s, (n[1] * d[0] - n[0] * d[1]) / s]
}
/** base (2,p,q) triangle: P = square centre (= i), E = edge midpoint (above i), Q = vertex */
export function baseGeom(p: number, q: number): Geom {
  const rho = Math.acosh(1 / (Math.tan(Math.PI / p) * Math.tan(Math.PI / q)))   // centre → vertex
  const a = Math.acosh(Math.cos(Math.PI / q) / Math.sin(Math.PI / p))           // centre → edge midpoint
  const rq = Math.tanh(rho / 2), re = Math.tanh(a / 2)
  const sq: V2[] = []
  for (let k = 0; k < p; k++) { const t = Math.PI / p + (2 * Math.PI * k) / p; sq.push(cayley([rq * Math.cos(t), rq * Math.sin(t)])) }
  return { p, q, a, rho, P: [0, 1], E: cayley([re, 0]), Q: sq[0], sq }
}

export type Tri = { v: [V2, V2, V2]; par: number; size?: number }
/** screen frame of the canvas: user → device pixels */
export type View = { ox: number; oy: number; ux: number; uy: number; W: number; H: number; dpr: number }
const toPx = (V: View, z: V2): V2 => [V.ox + z[0] * V.ux, V.oy - z[1] * V.uy]

function reflectTri(T: Tri, k: number): Tri {
  const v = T.v, L = geodesicThrough(v[(k + 1) % 3], v[(k + 2) % 3]), nv = v.slice() as [V2, V2, V2]
  nv[k] = invertIn(L, v[k])
  return { v: nv, par: T.par ^ 1 }
}
/** Coxeter walk: crossing a wall separating chamber and target strictly lowers the number of such walls */
function walkTo(T: Tri, target: V2): Tri {
  for (let it = 0; it < 600; it++) {
    let moved = false
    for (let k = 0; k < 3; k++) {
      const L = geodesicThrough(T.v[(k + 1) % 3], T.v[(k + 2) % 3])
      if (sideSign(L, target) * sideSign(L, T.v[k]) < 0) { T = reflectTri(T, k); moved = true; break }
    }
    if (!moved) return T
  }
  return T
}
const keyOf = (T: Tri) => {
  const cx = (T.v[0][0] + T.v[1][0] + T.v[2][0]) / 3, cy = (T.v[0][1] + T.v[1][1] + T.v[2][1]) / 3
  return Math.round((cx / cy) * 4000) + ',' + Math.round(Math.log(cy) * 4000)
}
/** every triangle of φ(tiling) meeting the view and at least minPx across (FIFO BFS keeps reflection chains short) */
export function tiles(G: Geom, phi: Iso, V: View, bbox: number[], minPx: number, maxN = 40000): Tri[] {
  const T0: Tri = { v: [G.P, G.E, G.Q].map((z) => apply(phi, z)) as [V2, V2, V2], par: 0 }
  let T = walkTo(T0, [(bbox[0] + bbox[2]) / 2, Math.max(0.6 * bbox[1], 0.05)])
  const seen = new Set([keyOf(T)]), out: Tri[] = [], queue = [T], m = 30 * V.dpr
  let head = 0
  while (head < queue.length && out.length < maxN) {
    T = queue[head++]
    out.push(T)
    for (let k = 0; k < 3; k++) {
      const N = reflectTri(T, k), key = keyOf(N)
      if (seen.has(key)) continue
      seen.add(key)
      const p = N.v.map((z) => toPx(V, z))
      const size = Math.sqrt(Math.max((p[0][0] - p[1][0]) ** 2 + (p[0][1] - p[1][1]) ** 2, (p[1][0] - p[2][0]) ** 2 + (p[1][1] - p[2][1]) ** 2, (p[0][0] - p[2][0]) ** 2 + (p[0][1] - p[2][1]) ** 2))
      if (size < minPx) continue
      const pad = 0.5 * size + m
      const x0 = Math.min(p[0][0], p[1][0], p[2][0]) - pad, x1 = Math.max(p[0][0], p[1][0], p[2][0]) + pad
      const y0 = Math.min(p[0][1], p[1][1], p[2][1]) - pad, y1 = Math.max(p[0][1], p[1][1], p[2][1]) + pad
      if (x1 < 0 || x0 > V.W || y1 < 0 || y0 > V.H) continue
      N.size = size
      queue.push(N)
    }
  }
  return out
}

export type TileColours = { tA: string; tB: string; edge: string; lower: string; hl: string; ghost: string }
/** draw φ(tiling): tone A background, parity-1 triangles in tone B, highlighted φ(base tile), tile edges (side E–Q) */
export function drawTiles(ctx: CanvasRenderingContext2D, V: View, G: Geom, phi: Iso, tris: Tri[], C: TileColours, ghost: Tri[] | null) {
  const px = (z: V2) => toPx(V, z)
  const side = (z1: V2, z2: V2, straight: boolean) => {
    const p2 = px(z2)
    if (straight) { ctx.lineTo(p2[0], p2[1]); return }
    const L = geodesicThrough(z1, z2)
    if (L.type === 'v') { ctx.lineTo(p2[0], p2[1]); return }
    const Rp = L.R * V.ux
    if (Rp > 4e4) { ctx.lineTo(p2[0], p2[1]); return }
    const c = px([L.c, 0]), p1 = px(z1)
    const a1 = Math.atan2(p1[1] - c[1], p1[0] - c[0]), a2 = Math.atan2(p2[1] - c[1], p2[0] - c[0])
    ctx.arc(c[0], c[1], Rp, a1, a2, a2 < a1)
  }
  const polygon = (vs: V2[], straight = false) => {
    const p = px(vs[0]); ctx.moveTo(p[0], p[1])
    for (let i = 0; i < vs.length; i++) side(vs[i], vs[(i + 1) % vs.length], straight)
    ctx.closePath()
  }
  const { W, H, dpr } = V
  ctx.clearRect(0, 0, W, H)
  const yAxis = Math.max(0, Math.min(H, V.oy))
  ctx.fillStyle = C.tA; ctx.fillRect(0, 0, W, yAxis)
  ctx.fillStyle = C.lower; ctx.fillRect(0, yAxis, W, H - yAxis)
  const STRAIGHT = 7 * dpr
  ctx.beginPath()
  for (const T of tris) if (T.par) polygon(T.v, (T.size ?? 99) < STRAIGHT)
  ctx.fillStyle = C.tB; ctx.fill()
  ctx.beginPath(); polygon(G.sq.map((z) => apply(phi, z)))
  ctx.fillStyle = C.hl; ctx.fill()
  for (const [lo, hi, w] of [[0, 14, 0.6], [14, Infinity, 1.5]]) {
    ctx.beginPath()
    for (const T of tris) {
      const s = T.size ?? 99
      if (s < lo * dpr || s >= hi * dpr) continue
      const p = px(T.v[1]); ctx.moveTo(p[0], p[1]); side(T.v[1], T.v[2], s < STRAIGHT)
    }
    ctx.strokeStyle = C.edge; ctx.lineWidth = w * dpr; ctx.stroke()
  }
  if (ghost) {
    ctx.beginPath()
    for (const T of ghost) { const p = px(T.v[1]); ctx.moveTo(p[0], p[1]); side(T.v[1], T.v[2], false) }
    ctx.strokeStyle = C.ghost; ctx.lineWidth = 1.1 * dpr; ctx.setLineDash([4 * dpr, 3 * dpr]); ctx.stroke(); ctx.setLineDash([])
  }
}
