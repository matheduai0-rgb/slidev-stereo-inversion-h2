// Board lifecycle + drawing helpers shared by the Week 2 components (GeoGebra-like light style).
import JXG from 'jsxgraph'
import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { fin, phi, type V2, type V3 } from './geom'

// GeoGebra palette (keys kept from the original dark palette so components keep working)
export const COL = {
  fg: '#212121', dim: '#757575', grid: '#e0e0e0', accent: '#1565C0', cyan: '#0288D1',
  coral: '#D32F2F', emerald: '#388E3C', amber: '#EF6C00', blue: '#1565C0', sphere: '#9e9e9e',
  purple: '#6A1B9A', axis: '#252525',
}

JXG.Options.text.cssDefaultStyle = 'font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;'
JXG.Options.text.highlightCssDefaultStyle = JXG.Options.text.cssDefaultStyle
JXG.Options.text.fontSize = 14
JXG.Options.grid.strokeColor = COL.grid
JXG.Options.grid.strokeOpacity = 1
JXG.Options.grid.strokeWidth = 1

const axis = (dir: 'x' | 'y') => ({
  strokeColor: COL.axis, strokeWidth: 1.2, highlight: false,
  lastArrow: { type: 1, size: 7 },
  ticks: {
    strokeColor: COL.axis, majorHeight: 6, minorTicks: 0, insertTicks: false, ticksDistance: 1, drawZero: false,
    label: { strokeColor: '#555555', fontSize: 11, anchorX: dir === 'x' ? 'middle' : 'right', offset: dir === 'x' ? [0, -10] : [-6, 0] },
  },
})
/** GeoGebra Graphics-view preset: light grid, dark axes with arrowheads, small grey tick labels. */
export const GGB2D = { axis: true, grid: true, defaultAxes: { x: axis('x'), y: axis('y') } }

/** Create the board when the container has a size, keep it sized, free it on unmount. */
export function useBoard(el: Ref<HTMLElement | null>, bbox: [number, number, number, number], opts: Record<string, any>, build: (b: any) => void) {
  let board: any = null
  let ro: ResizeObserver | null = null
  const setup = () => {
    if (!el.value || board || el.value.clientWidth <= 0 || el.value.clientHeight <= 0) return
    board = JXG.JSXGraph.initBoard(el.value, {
      boundingbox: bbox, keepaspectratio: true, axis: false, grid: false,
      showNavigation: false, showCopyright: false, resize: { enabled: false },
      pan: { enabled: false }, zoom: { enabled: false }, ...opts,
    })
    build(board)
  }
  onMounted(() => {
    setup()
    ro = new ResizeObserver((entries) => {
      const r = entries[entries.length - 1]?.contentRect
      if (!r || r.width <= 0 || r.height <= 0) return
      if (!board) setup()
      else { board.resizeContainer(r.width, r.height, true, true); board.setBoundingBox(bbox, opts.keepaspectratio ?? true); board.fullUpdate() }
    })
    if (el.value) ro.observe(el.value)
  })
  onBeforeUnmount(() => { ro?.disconnect(); if (board) JXG.JSXGraph.freeBoard(board); board = null })
  return { board: () => board, update: () => board?.update() }
}

/** Plane curve from a point list; NaN gaps for ∞ and for jumps between branches. */
export function pcurve(board: any, fn: () => V2[], attrs: Record<string, any>) {
  const c = board.create('curve', [[], []], { highlight: false, ...attrs })
  c.updateDataArray = function () {
    this.dataX = []; this.dataY = []
    let prev: V2 | null = null
    for (const p of fn()) {
      const ok = fin(p) && Math.abs(p[0]) < 300 && Math.abs(p[1]) < 300
      if (ok && prev && Math.hypot(p[0] - prev[0], p[1] - prev[1]) > 25) { this.dataX.push(NaN); this.dataY.push(NaN) }
      this.dataX.push(ok ? p[0] : NaN); this.dataY.push(ok ? p[1] : NaN)
      prev = ok ? p : null
    }
  }
  return c
}
export const fnPoint = (board: any, fn: () => V2, name: string, color: string, size = 3, extra: Record<string, any> = {}) =>
  board.create('point', [() => fn()[0], () => fn()[1]], {
    name, size, fillColor: color, strokeColor: color, fixed: true, showInfobox: false,
    label: { strokeColor: color, fontSize: 14, offset: [7, 7] }, ...extra,
  })
/** GeoGebra free point: always blue with a dark rim (blue = draggable); `_color` kept for call compatibility. */
export const dragPoint = (board: any, xy: V2, name: string, _color?: string) =>
  board.create('point', xy, {
    name, size: 4, fillColor: COL.blue, strokeColor: '#1a1a1a', strokeWidth: 1.2, showInfobox: false,
    highlightFillColor: COL.blue, highlightStrokeColor: COL.blue, highlightStrokeWidth: 7, highlightStrokeOpacity: 0.3,
    label: { strokeColor: COL.blue, fontSize: 14, offset: [7, 7] },
  })
export function arrow2(board: any, from: () => V2, to: () => V2, color: string) {
  const a = board.create('point', [() => from()[0], () => from()[1]], { visible: false })
  const b = board.create('point', [() => to()[0], () => to()[1]], { visible: false })
  return board.create('arrow', [a, b], { strokeColor: color, strokeWidth: 2.4, highlight: false, fixed: true })
}

/**
 * Unit sphere S², the plane z = 0 and N in a view3d filling a [-3.6,3.6]² board.
 * Returns projection + helpers that draw 3D data as projected 2D curves (robust NaN gaps).
 */
export function sphereView(board: any, R3 = 2.5, Z3 = 1.4, az = 0.55, el = 0.32) {
  const view = board.create('view3d', [[-3.4, -3.4], [6.8, 6.8], [[-R3, R3], [-R3, R3], [-Z3, Z3]]], {
    axesPosition: 'none',
    xPlaneRear: { visible: false }, yPlaneRear: { visible: false }, zPlaneRear: { visible: false },
    az: { slider: { visible: false, start: az }, pointer: { enabled: true, speed: 1 } },
    el: { slider: { visible: false, start: el }, pointer: { enabled: true, speed: 1 } },
  })
  view.create('parametricsurface3d', [
    (u: number, v: number) => Math.sin(v) * Math.cos(u), (u: number, v: number) => Math.sin(v) * Math.sin(u), (_u: number, v: number) => Math.cos(v),
    [0, 2 * Math.PI], [0, Math.PI],
  ], { strokeColor: '#8a8a8a', strokeOpacity: 0.45, strokeWidth: 0.7, stepsU: 24, stepsV: 12 })
  // GeoGebra 3D: pale grey xOy plane with a light grid
  view.create('plane3d', [[0, 0, 0], [1, 0, 0], [0, 1, 0], [-R3, R3], [-R3, R3]], {
    fillColor: '#d9d9d9', fillOpacity: 0.35, strokeColor: '#bdbdbd',
    mesh3d: { visible: true, strokeColor: '#c4c4c4', stepWidthU: 0.5, stepWidthV: 0.5 },
  })
  view.create('point3d', [0, 0, 1], { name: 'N', fixed: true, size: 3, fillColor: COL.fg, strokeColor: COL.fg, label: { strokeColor: COL.fg, fontSize: 14 } })

  const inBox3 = (p: V3) => fin(p) && Math.abs(p[0]) <= R3 && Math.abs(p[1]) <= R3 && Math.abs(p[2]) <= Z3
  const proj = (p: V3): V2 => { const q = view.project3DTo2D(p); return [q[1] / q[0], q[2] / q[0]] }
  function scurve(fn: () => V3[], attrs: Record<string, any>, clip = false) {
    const c = board.create('curve', [[], []], { highlight: false, ...attrs })
    c.updateDataArray = function () {
      this.dataX = []; this.dataY = []
      for (const p of fn()) {
        if (!fin(p) || (clip && !inBox3(p))) { this.dataX.push(NaN); this.dataY.push(NaN); continue }
        const q = proj(p); this.dataX.push(q[0]); this.dataY.push(q[1])
      }
    }
    return c
  }
  const pt3 = (fn: () => V3, name: string, color: string, size = 3.5) =>
    view.create('point3d', [() => fn()[0], () => fn()[1], () => fn()[2]], {
      name, size, fillColor: color, strokeColor: '#1a1a1a', strokeWidth: 1, fixed: true, label: { strokeColor: color, fontSize: 14 },
    })
  /** segment N → Φ(Q) for a sphere point Q, capped at the plane square */
  const cappedRay = (Q: () => V3, color: string, dash = 0) => scurve(() => {
    const h = phi(Q()); if (!fin(h)) return []
    const m = Math.max(Math.abs(h[0]), Math.abs(h[1])), t = m > R3 ? R3 / m : 1
    return [[0, 0, 1], [t * h[0], t * h[1], 1 - t]]
  }, { strokeColor: color, strokeWidth: 1.4, dash })
  /** a sphere point's plane image as a 3D point on z = 0 (hidden when outside the square) */
  const onPlane = (q: () => V2) => (): V3 => { const p = q(); return fin(p) && Math.abs(p[0]) <= R3 && Math.abs(p[1]) <= R3 ? [p[0], p[1], 0] : [NaN, NaN, NaN] }
  function arrow3(from: () => V3, to: () => V3, color: string) {
    const a = board.create('point', [() => proj(from())[0], () => proj(from())[1]], { visible: false })
    const b = board.create('point', [() => proj(to())[0], () => proj(to())[1]], { visible: false })
    return board.create('arrow', [a, b], { strokeColor: color, strokeWidth: 2.4, highlight: false, fixed: true })
  }
  // GeoGebra 3D axes (thin, dark) through the origin
  ;([[R3, 0, 0], [0, R3, 0], [0, 0, Z3]] as V3[]).forEach((e) =>
    scurve(() => [[-e[0], -e[1], -e[2]], e], { strokeColor: COL.axis, strokeWidth: 0.9, strokeOpacity: 0.7 }))
  return { view, proj, scurve, pt3, cappedRay, onPlane, arrow3, inBox3 }
}

/** requestAnimationFrame play loop; returns toggle + stop. */
export function usePlayer(step: (t: number) => void) {
  let playing = false, t0 = 0, raf = 0
  const loop = (ts: number) => { if (!playing) return; step((ts - t0) / 1000); raf = requestAnimationFrame(loop) }
  const toggle = () => { playing = !playing; if (playing) { t0 = performance.now(); raf = requestAnimationFrame(loop) } else cancelAnimationFrame(raf); return playing }
  onBeforeUnmount(() => { playing = false; cancelAnimationFrame(raf) })
  return { toggle }
}

/* ---------- upper half-plane helpers (Week 3) ---------- */
/** pale tint over y > 0 and a heavier x-axis marking the ideal boundary y = 0 */
export function shadeH2(board: any) {
  board.create('polygon', [[-100, 0], [100, 0], [100, 100], [-100, 100]], {
    fillColor: '#1565C0', fillOpacity: 0.035, borders: { visible: false }, vertices: { visible: false },
    highlight: false, fixed: true, hasInnerPoints: false,
  })
  board.create('line', [[0, 0], [1, 0]], { strokeColor: COL.axis, strokeWidth: 2.2, highlight: false, fixed: true })
}
/** free point restricted to H² (y ≥ ymin) */
export function dragPointH(board: any, xy: V2, name: string, ymin = 0.08) {
  const p = dragPoint(board, xy, name)
  p.on('drag', () => { if (p.Y() < ymin) p.moveTo([p.X(), ymin]) })
  return p
}
