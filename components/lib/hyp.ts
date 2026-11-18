// Upper half-plane H² = {y > 0} with Poincaré's length l_H(γ) = ∫ |γ'| / y  (Lee 4.1–4.2).
import type { V2 } from './geom'

export const hyp = { EPS_Y: 1e-9 }

/** hyperbolic length of a sampled curve (midpoint rule: Σ |Δp| / ȳ) */
export function hypLength(pts: V2[]): number {
  let s = 0
  for (let i = 0; i + 1 < pts.length; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]
    if (![x0, y0, x1, y1].every(Number.isFinite)) continue
    const ym = (y0 + y1) / 2
    s += ym > hyp.EPS_Y ? Math.hypot(x1 - x0, y1 - y0) / ym : Infinity
  }
  return s
}
/** Euclidean length of a sampled curve */
export function eucLength(pts: V2[]): number {
  let s = 0
  for (let i = 0; i + 1 < pts.length; i++) if (pts[i].concat(pts[i + 1]).every(Number.isFinite)) s += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1])
  return s
}

/** the unique hyperbolic line through p1, p2: a vertical line or a semicircle centred on the x-axis */
export type HLine = { type: 'v'; x: number } | { type: 'c'; c: number; R: number }
export function geodesic(p1: V2, p2: V2): HLine {
  const [x1, y1] = p1, [x2, y2] = p2
  if (Math.abs(x1 - x2) < 1e-9) return { type: 'v', x: x1 }
  const c = (x2 * x2 + y2 * y2 - x1 * x1 - y1 * y1) / (2 * (x2 - x1))
  return { type: 'c', c, R: Math.hypot(x1 - c, y1) }
}
/** samples of the whole hyperbolic line (for drawing) */
export function sampleHLine(g: HLine, n = 300, ymax = 30): V2[] {
  if (g.type === 'v') return Array.from({ length: n + 1 }, (_, i) => [g.x, 1e-3 + (ymax * i) / n] as V2)
  return Array.from({ length: n + 1 }, (_, i) => { const t = (Math.PI * i) / n; return [g.c + g.R * Math.cos(t), g.R * Math.sin(t)] as V2 })
}
/** samples of the geodesic segment from p1 to p2 (uniform in hyperbolic arclength for vertical lines) */
export function geodesicArc(p1: V2, p2: V2, n = 400): V2[] {
  const g = geodesic(p1, p2)
  if (g.type === 'v') return Array.from({ length: n + 1 }, (_, i) => [g.x, p1[1] * Math.pow(p2[1] / p1[1], i / n)] as V2)
  const t1 = Math.atan2(p1[1], p1[0] - g.c), t2 = Math.atan2(p2[1], p2[0] - g.c)
  return Array.from({ length: n + 1 }, (_, i) => { const t = t1 + ((t2 - t1) * i) / n; return [g.c + g.R * Math.cos(t), g.R * Math.sin(t)] as V2 })
}
/** d_H via Latihan 4.4: 2 artanh( d(p1,p2) / d(p1, r̄(p2)) ), r̄(x,y) = (x,−y) */
export function dH(p1: V2, p2: V2): number {
  const d = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]), dr = Math.hypot(p1[0] - p2[0], p1[1] + p2[1])
  return 2 * Math.atanh(Math.min(1 - 1e-15, d / dr))
}
/** point at hyperbolic arclength fraction f ∈ [0,1] along sampled curve */
export function pointAtFraction(pts: V2[], f: number): V2 {
  const total = hypLength(pts), target = f * total
  let s = 0
  for (let i = 0; i + 1 < pts.length; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], ds = Math.hypot(x1 - x0, y1 - y0) / ((y0 + y1) / 2)
    if (s + ds >= target) { const u = ds > 0 ? (target - s) / ds : 0; return [x0 + u * (x1 - x0), y0 + u * (y1 - y0)] }
    s += ds
  }
  return pts[pts.length - 1]
}
/** footsteps of equal hyperbolic length h along a sampled curve (always includes the start) */
export function footsteps(pts: V2[], h: number): V2[] {
  const out: V2[] = [pts[0]]
  let acc = 0
  for (let i = 0; i + 1 < pts.length; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], ds = Math.hypot(x1 - x0, y1 - y0) / ((y0 + y1) / 2)
    let local = 0
    while (acc + (ds - local) >= h) {
      local += h - acc; acc = 0
      const u = local / ds; out.push([x0 + u * (x1 - x0), y0 + u * (y1 - y0)])
    }
    acc += ds - local
  }
  return out
}

/* ---------- maps of H² (Lee Ex. 4.1–4.3, Prop. 4.3, Thm 4.4) and one non-isometry ---------- */
export const tA = (a: number) => ([x, y]: V2): V2 => [x + a, y]
export const reflL = (a: number) => ([x, y]: V2): V2 => [2 * a - x, y]
export const dil = (r: number) => ([x, y]: V2): V2 => [r * x, r * y]
export const unitInv = ([x, y]: V2): V2 => { const s = x * x + y * y; return s < 1e-14 ? [NaN, NaN] : [x / s, y / s] }
/** inversion in the circle centred (c,0) with radius r */
export const invC = (c: number, r: number) => ([x, y]: V2): V2 => { const dx = x - c, s = dx * dx + y * y; return s < 1e-14 ? [NaN, NaN] : [c + (r * r * dx) / s, (r * r * y) / s] }
/** vertical translation — NOT an isometry of H² (Socratic contrast) */
export const vShift = (b: number) => ([x, y]: V2): V2 => [x, y + b]

/** quadratic Bézier through control points, sampled */
export function bezier(p0: V2, p1: V2, p2: V2, n = 300): V2[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, a = (1 - t) * (1 - t), b = 2 * t * (1 - t), c = t * t
    return [a * p0[0] + b * p1[0] + c * p2[0], a * p0[1] + b * p1[1] + c * p2[1]] as V2
  })
}
/** small Euclidean circle (as polyline + NaN separator) — used to draw footsteps */
export const dot = (p: V2, r: number, k = 14): V2[] => [...Array.from({ length: k + 1 }, (_, i) => [p[0] + r * Math.cos((2 * Math.PI * i) / k), p[1] + r * Math.sin((2 * Math.PI * i) / k)] as V2), [NaN, NaN]]

/* ---------- hyperbolic lines as equidistant loci, inversions in them (Lee 4.13–4.20) ---------- */
/** H_{p1,p2} = { q : d_H(q,p1) = d_H(q,p2) } ⇔ |q−p1|²/y1 = |q−p2|²/y2 (Def. 4.13, Thm 4.16) */
export function bisector(p1: V2, p2: V2): HLine {
  const [x1, y1] = p1, [x2, y2] = p2
  if (Math.abs(y1 - y2) < 1e-12) return { type: 'v', x: (x1 + x2) / 2 }
  const A = y2 - y1, c = (y2 * x1 - y1 * x2) / A
  const K = (y2 * (x1 * x1 + y1 * y1) - y1 * (x2 * x2 + y2 * y2)) / A
  return { type: 'c', c, R: Math.sqrt(Math.max(0, c * c - K)) }
}
/** inversion I_L in a hyperbolic line L (vertical line: reflection; semicircle: I_{C_((c,0),R)}) */
export const invH = (L: HLine) => (p: V2): V2 => (L.type === 'v' ? [2 * L.x - p[0], p[1]] : invC(L.c, L.R)(p))
/** real Möbius map z ↦ (az + b)/(cz + d) on H² (ad − bc > 0) */
export const mobius = (a: number, b: number, c: number, d: number) => ([x, y]: V2): V2 => {
  const nr = a * x + b, ni = a * y, dr = c * x + d, di = c * y, s = dr * dr + di * di
  return [(nr * dr + ni * di) / s, (ni * dr - nr * di) / s]
}
/** elliptic rotation of H² about i by angle θ */
export const ellRot = (t: number) => mobius(Math.cos(t / 2), Math.sin(t / 2), -Math.sin(t / 2), Math.cos(t / 2))
/** point on a hyperbolic line at parameter u ∈ (0,1) (semicircle: angle πu; vertical line: y = e^{6(u−½)}) */
export const hlinePoint = (L: HLine, u: number): V2 => (L.type === 'v' ? [L.x, Math.exp(6 * (u - 0.5))] : [L.c + L.R * Math.cos(Math.PI * u), L.R * Math.sin(Math.PI * u)])
export const close2 = (a: V2, b: V2, tol = 1e-9) => Math.hypot(a[0] - b[0], a[1] - b[1]) < tol
