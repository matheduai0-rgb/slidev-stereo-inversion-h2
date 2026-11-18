// Shared analytic geometry for the Week 2 components (ported from animations/jsxgraph/*.html).
export type V2 = [number, number]
export type V3 = [number, number, number]

/* ---------- 2D vectors ---------- */
export const add = (a: V2, b: V2): V2 => [a[0] + b[0], a[1] + b[1]]
export const sub = (a: V2, b: V2): V2 => [a[0] - b[0], a[1] - b[1]]
export const mul = (a: V2, k: number): V2 => [a[0] * k, a[1] * k]
export const dot = (a: V2, b: V2) => a[0] * b[0] + a[1] * b[1]
export const cross = (a: V2, b: V2) => a[0] * b[1] - a[1] * b[0]
export const perp = (a: V2): V2 => [-a[1], a[0]]
export const len = (a: V2) => Math.hypot(a[0], a[1])
export const lerp = (a: V2, b: V2, t: number): V2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
export const fin = (p: number[] | null | undefined) => !!p && p.every(Number.isFinite)

/* ---------- 3D vectors ---------- */
export const v3 = {
  add: (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k],
  dot: (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  len: (a: V3) => Math.hypot(a[0], a[1], a[2]),
  unit: (a: V3): V3 => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l] },
}
export const NORTH: V3 = [0, 0, 1]
export const NAN2: V2 = [NaN, NaN]
export const NAN3: V3 = [NaN, NaN, NaN]
export const deg = (x: number) => (x * 180) / Math.PI

/* ---------- stereographic projection from N = (0,0,1) ---------- */
export const sph = (t: number, f: number): V3 => [Math.sin(f) * Math.cos(t), Math.sin(f) * Math.sin(t), Math.cos(f)]
export function phi([x, y, z]: V3): V2 {
  const d = 1 - z
  return Math.abs(d) < 1e-12 ? NAN2 : [x / d, y / d]
}
export function phiInv(p: V2): V3 {
  if (!fin(p)) return NAN3
  const s = p[0] * p[0] + p[1] * p[1]
  return [(2 * p[0]) / (s + 1), (2 * p[1]) / (s + 1), (s - 1) / (s + 1)]
}
/** unit inversion I(p) = p/|p|² */
export const unitInv = (p: V2): V2 => { const s = dot(p, p); return s < 1e-14 ? NAN2 : mul(p, 1 / s) }

/** tangent frame at sph(θ,φ): e_θ (east), e_φ (south) */
export const frame = (t: number, f: number): [V3, V3] => [
  [-Math.sin(t), Math.cos(t), 0],
  [Math.cos(f) * Math.cos(t), Math.cos(f) * Math.sin(t), -Math.sin(f)],
]
export const tangent = (t: number, f: number, a: number): V3 => {
  const [e1, e2] = frame(t, f)
  return v3.add(v3.mul(e1, Math.cos(a)), v3.mul(e2, Math.sin(a)))
}
/** point at geodesic distance s from p along unit tangent t */
export const expMap = (p: V3, t: V3, s: number): V3 => v3.add(v3.mul(p, Math.cos(s)), v3.mul(t, Math.sin(s)))
/** derivative of a sphere→plane map at p in tangent direction t (central difference) */
export function dMap(map: (x: V3) => V2, p: V3, t: V3, h = 1e-6): V2 {
  const a = map(expMap(p, t, h)), b = map(expMap(p, t, -h))
  return [(a[0] - b[0]) / (2 * h), (a[1] - b[1]) / (2 * h)]
}
export const angle3 = (u: V3, v: V3) => Math.acos(Math.max(-1, Math.min(1, v3.dot(v3.unit(u), v3.unit(v)))))
export const angle2 = (u: V2, v: V2) => Math.acos(Math.max(-1, Math.min(1, dot(u, v) / (len(u) * len(v)))))

/** circle S² ∩ {m·x = h}, sampled starting from `start` (any point of the circle) */
export function sphereCircle(m: V3, h: number, start: V3, n = 240): V3[] {
  const c = v3.mul(m, h), r = Math.sqrt(Math.max(0, 1 - h * h))
  const e1 = v3.unit(v3.sub(start, c)), e2 = v3.cross(m, e1), pts: V3[] = []
  for (let i = 0; i <= n; i++) {
    const s = (2 * Math.PI * i) / n
    pts.push(v3.add(c, v3.add(v3.mul(e1, r * Math.cos(s)), v3.mul(e2, r * Math.sin(s)))))
  }
  return pts
}
/** circle S² ∩ {n·x = h} with n given by (tilt α, azimuth β): sample by angle */
export function circleOnSphere(n: V3, h: number, k = 240): V3[] {
  const ref: V3 = Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0]
  const e1 = v3.unit(v3.cross(n, ref)), e2 = v3.cross(n, e1), r = Math.sqrt(Math.max(0, 1 - h * h)), pts: V3[] = []
  for (let i = 0; i <= k; i++) {
    const t = (2 * Math.PI * i) / k
    pts.push(v3.add(v3.mul(n, h), v3.add(v3.mul(e1, r * Math.cos(t)), v3.mul(e2, r * Math.sin(t)))))
  }
  return pts
}
/** Lee's construction in Thm 3.5: plane through p and N containing tangent t */
export function planeThroughN(p: V3, t: V3) {
  const m = v3.unit(v3.cross(v3.sub(NORTH, p), t))
  return { m, h: v3.dot(m, p) }
}
/** reflection in the perpendicular bisector plane of pN (through 0, so linear) */
export const reflectBisector = (p: V3, x: V3): V3 => {
  const n = v3.unit(v3.sub(NORTH, p))
  return v3.sub(x, v3.mul(n, 2 * v3.dot(n, x)))
}

/* ---------- generalised inversion I_C in a circline ---------- */
export type Circ =
  | { line: true; A: V2; n: V2; k: number }
  | { line: false; A: V2; n: V2; kappa: number; q: V2; r: number }
export type Circline = { type: 'circle'; c: V2; s: number } | { type: 'line'; p0: V2; d: V2 }
export const KTOL = 2e-3

/** C through anchor A with unit normal n(β) and signed curvature κ: q = A + n/κ, r = 1/|κ| */
export function makeC(A: V2, beta: number, kappa: number): Circ {
  const n: V2 = [Math.cos(beta), Math.sin(beta)]
  if (Math.abs(kappa) < KTOL) return { line: true, A, n, k: dot(n, A) }
  return { line: false, A, n, kappa, q: add(A, mul(n, 1 / kappa)), r: 1 / Math.abs(kappa) }
}
export const circleC = (q: V2, r: number): Circ => ({ line: false, A: add(q, [r, 0]), n: [-1, 0], kappa: 1 / r, q, r })
export function inv(C: Circ, p: V2): V2 {
  if (!fin(p)) return NAN2
  if (C.line) return sub(p, mul(C.n, 2 * (dot(C.n, p) - C.k)))
  const d = sub(p, C.q), s = dot(d, d)
  return s < 1e-14 ? NAN2 : add(C.q, mul(d, (C.r * C.r) / s))
}
export const asCircline = (C: Circ): Circline => (C.line ? { type: 'line', p0: C.A, d: perp(C.n) } : { type: 'circle', c: C.q, s: C.r })
export function sampleCircline(o: Circline, n = 400): V2[] {
  const pts: V2[] = []
  if (o.type === 'circle')
    for (let i = 0; i <= n; i++) { const t = (2 * Math.PI * i) / n; pts.push([o.c[0] + o.s * Math.cos(t), o.c[1] + o.s * Math.sin(t)]) }
  else
    for (let i = 1; i < n; i++) { const t = Math.max(-1e5, Math.min(1e5, Math.tan(Math.PI * (i / n - 0.5)))); pts.push(add(o.p0, mul(o.d, t))) }
  return pts
}
/** samples of C concentrated near the anchor, so nearly flat circles render well */
export function sampleC(C: Circ, n = 600): V2[] {
  if (C.line) return sampleCircline(asCircline(C), n)
  const a0 = Math.atan2(C.A[1] - C.q[1], C.A[0] - C.q[0]), pts: V2[] = []
  for (let i = 0; i <= n; i++) { const u = (2 * i) / n - 1, t = a0 + Math.PI * u * u * u; pts.push([C.q[0] + C.r * Math.cos(t), C.q[1] + C.r * Math.sin(t)]) }
  return pts
}
/** exact image of a circline under I_C */
export function imageCircline(C: Circ, o: Circline): Circline {
  if (C.line) {
    if (o.type === 'circle') return { type: 'circle', c: inv(C, o.c), s: o.s }
    return { type: 'line', p0: inv(C, o.p0), d: sub(o.d, mul(C.n, 2 * dot(C.n, o.d))) }
  }
  const { q, r } = C
  if (o.type === 'circle') {
    const D = len(sub(o.c, q)), u: V2 = D < 1e-12 ? [1, 0] : mul(sub(o.c, q), 1 / D)
    if (Math.abs(D - o.s) < 1e-9) return { type: 'line', p0: add(q, mul(u, (r * r) / (2 * o.s))), d: perp(u) }
    const b1 = inv(C, add(q, mul(u, D + o.s))), b2 = inv(C, add(q, mul(u, D - o.s)))
    return { type: 'circle', c: mul(add(b1, b2), 0.5), s: len(sub(b1, b2)) / 2 }
  }
  const foot = add(o.p0, mul(o.d, dot(sub(q, o.p0), o.d))), m = sub(foot, q), M = len(m)
  if (M < 1e-9) return { type: 'line', p0: q, d: o.d }
  return { type: 'circle', c: add(q, mul(m, (r * r) / (2 * M * M))), s: (r * r) / (2 * M) }
}
export const distTo = (o: Circline, x: V2) => (o.type === 'circle' ? Math.abs(len(sub(x, o.c)) - o.s) : Math.abs(cross(sub(x, o.p0), o.d)))
/** intersection angle (degrees, 0..90) of two circlines; null if disjoint */
export function angleBetween(a: Circline, b: Circline): number | null {
  if (a.type === 'circle' && b.type === 'circle') {
    const D = len(sub(a.c, b.c)), c = (a.s * a.s + b.s * b.s - D * D) / (2 * a.s * b.s)
    return Math.abs(c) > 1 ? null : deg(Math.acos(Math.abs(c)))
  }
  if (a.type === 'line' && b.type === 'line') return deg(Math.acos(Math.min(1, Math.abs(dot(a.d, b.d)))))
  const ci = (a.type === 'circle' ? a : b) as Extract<Circline, { type: 'circle' }>
  const li = (a.type === 'line' ? a : b) as Extract<Circline, { type: 'line' }>
  const dl = Math.abs(cross(sub(ci.c, li.p0), li.d))
  return dl > ci.s ? null : deg(Math.acos(dl / ci.s))
}

/* ---------- sphere side: Ĉ = Φ⁻¹(C) and the generalised reflection ρ_Ĉ ---------- */
export type SphereCirc = { nh: V3; h: number }
/** Ĉ lies in the plane a x + b y + c z + d = 0, normalised to n̂·x = h */
export function sphereCoeffs(C: Circ): SphereCirc {
  let a: number, b: number, c: number, d: number
  if (C.line) [a, b, c, d] = [C.n[0], C.n[1], C.k, -C.k]
  else { const Q = dot(C.q, C.q), R = C.r * C.r; [a, b, c, d] = [-C.q[0], -C.q[1], (1 - Q + R) / 2, (1 + Q - R) / 2] }
  const L = Math.hypot(a, b, c)
  return { nh: [a / L, b / L, c / L], h: -d / L }
}
/** plane reflection (great circle, h = 0) or inversion in the sphere ⟂ S² centred at V = n̂/h */
export function rho(Ch: SphereCirc, x: V3): V3 {
  if (!fin(x)) return NAN3
  const { nh, h } = Ch
  if (Math.abs(h) < 1e-9) return v3.sub(x, v3.mul(nh, 2 * v3.dot(nh, x)))
  const V = v3.mul(nh, 1 / h), R2 = 1 / (h * h) - 1, w = v3.sub(x, V), s = v3.dot(w, w)
  return s < 1e-14 ? NAN3 : v3.add(V, v3.mul(w, R2 / s))
}
export const apex = (Ch: SphereCirc): V3 | null => (Math.abs(Ch.h) < 1e-9 ? null : v3.mul(Ch.nh, 1 / Ch.h))

export const fmt = (x: number, n = 3) => (Number.isFinite(x) ? (x >= 0 ? ' ' : '') + x.toFixed(n) : '∞')
export const fp = (p: number[]) => (fin(p) ? `(${p.map((c) => fmt(c)).join(', ')})` : '∞')

/* ---------- tangent vectors & angles of circlines (plane) and circles (sphere) ---------- */
const unit2 = (a: V2): V2 => { const l = len(a) || 1; return [a[0] / l, a[1] / l] }
/** unit tangent of a circline at p (circle: perp(p − c); line: its direction) */
export const circlineTangent = (o: Circline, p: V2): V2 => (o.type === 'circle' ? unit2(perp(sub(p, o.c))) : unit2(o.d))
/** finite intersection points of two circlines (parallel lines meet only at ∞) */
export function circlineMeet(a: Circline, b: Circline): V2[] {
  if (a.type === 'circle' && b.type === 'circle') {
    const D = len(sub(b.c, a.c))
    if (D < 1e-12 || D > a.s + b.s || D < Math.abs(a.s - b.s)) return []
    const u = mul(sub(b.c, a.c), 1 / D), x = (a.s * a.s - b.s * b.s + D * D) / (2 * D), h = Math.sqrt(Math.max(0, a.s * a.s - x * x))
    const m = add(a.c, mul(u, x))
    return [add(m, mul(perp(u), h)), sub(m, mul(perp(u), h))]
  }
  if (a.type === 'line' && b.type === 'line') {
    const den = cross(a.d, b.d)
    if (Math.abs(den) < 1e-12) return []
    return [add(a.p0, mul(a.d, cross(sub(b.p0, a.p0), b.d) / den))]
  }
  const ci = (a.type === 'circle' ? a : b) as Extract<Circline, { type: 'circle' }>
  const li = (a.type === 'line' ? a : b) as Extract<Circline, { type: 'line' }>
  const d = unit2(li.d), f = add(li.p0, mul(d, dot(sub(ci.c, li.p0), d))), e = len(sub(f, ci.c))
  if (e > ci.s) return []
  const h = Math.sqrt(Math.max(0, ci.s * ci.s - e * e))
  return [add(f, mul(d, h)), sub(f, mul(d, h))]
}
/** circline A|u|² + B·u + C = 0 (A = 0: line); its direction is J∇F (circle: counterclockwise, line: d) */
export type Coeffs = { A: number; B: V2; C: number }
export const circlineCoeffs = (o: Circline): Coeffs =>
  o.type === 'circle' ? { A: 1, B: mul(o.c, -2), C: dot(o.c, o.c) - o.s * o.s } : (() => { const n = mul(perp(unit2(o.d)), -1); return { A: 0, B: n, C: -dot(n, o.p0) } })()
export function coeffsToCircline({ A, B, C }: Coeffs): Circline {
  if (Math.abs(A) > 1e-9) { const c = mul(B, -1 / (2 * A)); return { type: 'circle', c, s: Math.sqrt(Math.max(0, dot(B, B) - 4 * A * C)) / (2 * Math.abs(A)) } }
  const L2 = dot(B, B) || 1
  return { type: 'line', p0: mul(B, -C / L2), d: unit2(perp(B)) }
}
/** gradient ∇F(u) = 2A u + B: a normal of the circline at u */
export const coeffsNormal = ({ A, B }: Coeffs, u: V2): V2 => add(mul(u, 2 * A), B)
/** cos ∠ between the directions J∇F₁, J∇F₂ at a common point (Lee 3.1: angle of tangent vectors, in [0, π]) */
export const coeffsCos = (P: Coeffs, Q: Coeffs) =>
  (dot(P.B, Q.B) - 2 * (P.A * Q.C + Q.A * P.C)) / Math.sqrt((dot(P.B, P.B) - 4 * P.A * P.C) * (dot(Q.B, Q.B) - 4 * Q.A * Q.C))
/** Ĉ = S² ∩ {n̂·x = h} ↦ Φ(Ĉ): plane (a,b,c,d) = (n̂, −h) gives (c+d)|u|² + 2(a,b)·u + (d−c) = 0 (Thm 3.4) */
export const sphereToCoeffs = ({ nh, h }: SphereCirc): Coeffs => ({ A: nh[2] - h, B: [2 * nh[0], 2 * nh[1]], C: -h - nh[2] })

/** unit normal from azimuth β and tilt α */
export const nFrom = (beta: number, alpha: number): V3 => [Math.sin(alpha) * Math.cos(beta), Math.sin(alpha) * Math.sin(beta), Math.cos(alpha)]
/** point of S² ∩ {n̂·x = h} at parameter s (same frame as circleOnSphere, so p′(s) = n̂ × p) */
export function circlePoint(n: V3, h: number, s: number): V3 {
  const ref: V3 = Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0]
  const e1 = v3.unit(v3.cross(n, ref)), e2 = v3.cross(n, e1), r = Math.sqrt(Math.max(0, 1 - h * h))
  return v3.add(v3.mul(n, h), v3.add(v3.mul(e1, r * Math.cos(s)), v3.mul(e2, r * Math.sin(s))))
}
/** intersection of two circles on S²: x = αn̂₁ + βn̂₂ + t(n̂₁ × n̂₂), |x| = 1 */
export function sphereCircleMeet(n1: V3, h1: number, n2: V3, h2: number): V3[] {
  const g = v3.dot(n1, n2), D = 1 - g * g
  if (D < 1e-10) return []
  const al = (h1 - h2 * g) / D, be = (h2 - h1 * g) / D, x0 = v3.add(v3.mul(n1, al), v3.mul(n2, be))
  const t2 = (1 - (al * h1 + be * h2)) / D
  if (t2 < 0) return []
  const m = v3.mul(v3.cross(n1, n2), Math.sqrt(t2))
  return [v3.add(x0, m), v3.sub(x0, m)]
}
/** cos θ = (n̂₁·n̂₂ − h₁h₂)/√((1−h₁²)(1−h₂²)) for the tangents n̂ᵢ × p */
export const sphereCos = (n1: V3, h1: number, n2: V3, h2: number) => (v3.dot(n1, n2) - h1 * h2) / Math.sqrt((1 - h1 * h1) * (1 - h2 * h2))
/** closed-form dΦ_p(v) = (v_xy(1−z) + v_z p_xy)/(1−z)² */
export function dPhiExact(p: V3, v: V3): V2 {
  const w = 1 - p[2]
  return [(v[0] * w + v[2] * p[0]) / (w * w), (v[1] * w + v[2] * p[1]) / (w * w)]
}
/** acute angle (degrees) between two lines with directions u, v */
export const lineAngle2 = (u: V2, v: V2) => deg(Math.acos(Math.min(1, Math.abs(dot(u, v)) / (len(u) * len(v)))))
export const lineAngle3 = (u: V3, v: V3) => deg(Math.acos(Math.min(1, Math.abs(v3.dot(u, v)) / (v3.len(u) * v3.len(v)))))
