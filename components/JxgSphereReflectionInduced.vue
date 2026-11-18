<script setup lang="ts">
// Teorema 3.14 (and its generalisation): I_C = Φ ∘ ρ_Ĉ ∘ Φ⁻¹ with Ĉ = Φ⁻¹(C).
// Great circle Ĉ: ρ = plane reflection r̄_G. Small circle: inversion in the sphere ⟂ S² centred at V = n̂/h.
import { ref, watch } from 'vue'
import { apex, dot, fin, fmt, inv, len, makeC, phi, phiInv, rho, sampleC, sph, sphereCoeffs, sub, type V2, type V3 } from './lib/geom'
import { COL, sphereView, useBoard } from './lib/jxg'

const props = defineProps({ height: { type: String, default: '290px' } })
const el = ref<HTMLElement | null>(null)
const beta = ref(0.3)
const kappa = ref(-0.45)
const theta = ref(0.9)
const colat = ref(1.3)
const readout = ref('')

const A: V2 = [0.6, 0.2]
const C = () => makeC(A, beta.value, kappa.value)
const Ch = () => sphereCoeffs(C())
const P = () => sph(theta.value, colat.value)
const Ps = () => rho(Ch(), P())
const B = useBoard(el, [-3.6, 3.6, 3.6, -3.6], {}, (board) => {
  const S = sphereView(board)
  S.scurve(() => sampleC(C()).map(phiInv), { strokeColor: COL.emerald, strokeWidth: 2.8 })
  S.scurve(() => sampleC(C()).map((q) => [q[0], q[1], 0] as V3), { strokeColor: COL.emerald, strokeWidth: 1.4, dash: 2 }, true)
  S.cappedRay(P, COL.amber)
  S.cappedRay(Ps, COL.coral, 2)
  S.scurve(() => { const V = apex(Ch()); return V && S.inBox3(V) ? [V, P(), Ps()] : [P(), Ps()] }, { strokeColor: COL.cyan, strokeWidth: 1.2, dash: 1 })
  S.pt3(() => { const V = apex(Ch()); return V && S.inBox3(V) ? V : [NaN, NaN, NaN] }, 'V', COL.cyan, 3)
  S.pt3(P, 'P', COL.amber, 4)
  S.pt3(Ps, 'P* = ρ(P)', COL.coral, 4)
  S.pt3(S.onPlane(() => phi(P())), 'p', COL.amber, 3.5)
  S.pt3(S.onPlane(() => inv(C(), phi(P()))), 'I_C(p)', COL.coral, 3.5)
  board.on('update', () => {
    const ch = Ch(), p = phi(P()), I = inv(C(), p), via = phi(Ps())
    const kind = Math.abs(ch.h) < 0.01 ? 'Ĉ lingkaran besar ⇒ ρ = r̄_G (Teorema 3.14)' : `Ĉ lingkaran kecil ⇒ ρ = inversi pada bola pusat V, R² = 1/h²−1 = ${fmt(1 / ch.h ** 2 - 1, 2)}`
    const err = fin(I) && fin(via) ? len(sub(I, via)).toExponential(1) : '—'
    readout.value = `${C().line ? 'C garis ⇔ N ∈ Ĉ' : 'C lingkaran'} · h = ${fmt(ch.h, 3)} · ${kind}   |Φ(P*) − I_C(p)| = ${err}`
  })
  board.update()
})
watch([beta, kappa, theta, colat], () => B.update())
// choose κ with h = 0, i.e. r² = 1 + |q|² (C meets the unit circle in antipodal points)
function greatCircle() {
  const n: V2 = [Math.cos(beta.value), Math.sin(beta.value)]
  const k = (-2 * dot(A, n)) / (dot(A, A) + 1)
  if (Math.abs(k) <= 1.2) kappa.value = k
}
</script>

<template>
  <div class="jxg-card">
    <div ref="el" class="jxgbox" :style="{ width: '100%', height: props.height }"></div>
    <div class="jxg-controls">
      <span style="color: var(--fg-dim)">β</span><input v-model.number="beta" type="range" min="0" max="6.283" step="0.01" style="width: 55px" />
      <span style="color: var(--fg-dim)">κ</span><input v-model.number="kappa" type="range" min="-1.2" max="1.2" step="0.001" style="width: 70px" />
      <span style="color: var(--fg-dim)">P: θ</span><input v-model.number="theta" type="range" min="0" max="6.283" step="0.01" style="width: 55px" />
      <span style="color: var(--fg-dim)">φ</span><input v-model.number="colat" type="range" min="0.3" max="3.0" step="0.01" style="width: 55px" />
      <button class="jxg-btn" @click="greatCircle">Ĉ besar</button>
      <button class="jxg-btn" @click="kappa = 0">C garis</button>
    </div>
    <div class="jxg-readout">{{ readout }}</div>
  </div>
</template>
