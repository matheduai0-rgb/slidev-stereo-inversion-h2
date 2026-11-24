# Lemma 3.13: Karakterisasi Ketunggalan Inversi $I_C$

<div class="thm-box">

**Lemma 3.13 (Karakterisasi Ketunggalan Inversi $I_C$ — Lee).** Misalkan circline $C$ membelah $\mathbb{R}^2_\infty \setminus C$ menjadi dua komponen terhubung $R_1$ dan $R_2$. Jika suatu bijeksi $f: \mathbb{R}^2_\infty \to \mathbb{R}^2_\infty$ memenuhi: (1) $f(p) = p$ untuk semua $p \in C$; (2) $f(R_1) = R_2$; (3) $f$ memetakan circline ke circline; dan (4) $f$ mengawetkan sudut *(Teorema 3.5, dikutip)*; **maka $f = I_C$**.

- *Ide Bukti Lee:* Untuk $p \notin C$, konstruksi dua circline ortogonal yang berpotongan di $p$ dan $I_C(p)$. Karena keempat syarat mengunci kedua circline tersebut secara invarian, maka $f(p) = I_C(p)$.

</div>

<div v-click class="socratic-box">

<span class="socratic-title">Mengapa ini berguna?</span> Untuk membuktikan bahwa suatu peta $f$ **adalah** inversi $I_C$, kita tidak perlu menghitung koordinat: cukup periksa keempat syarat di atas. Lemma 3.15 dibuktikan dengan cara ini.

</div>

---

# Lemma 3.15: Konjugasi Inversi & Kriteria Ortogonalitas

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="thm-box">

**Lemma 3.15 (Rumus Konjugasi Inversi — Lee) & Kriteria Ortogonalitas.**

- Untuk dua circline $C$ dan $\Gamma$ pada $\mathbb{R}^2_\infty$, berlaku $I_C \circ I_\Gamma \circ I_C = I_{\Gamma'}$ dengan $\Gamma' = I_C(\Gamma)$ *(dibuktikan langsung dengan memverifikasi syarat 1–4 Lemma 3.13 untuk $f = I_C \circ I_\Gamma \circ I_C$)*.
- **Kriteria Ortogonalitas Invariansi:** Circline $\Gamma \neq C$ dipetakan ke dirinya sendiri ($I_C(\Gamma) = \Gamma$) jika dan hanya jika $\Gamma$ memotong $C$ secara tegak lurus ($\Gamma \perp C$).

</div>

<div v-click class="proof-box">

**Membaca animasi:** kurva merah tebal adalah bayangan $\Gamma$ titik demi titik, garis putus-putus adalah rumus eksak — keduanya berimpit (Akibat 3.12). Tekan **Γ ⊥ C**: sudut potong menjadi $90^\circ$ dan $I_C(\Gamma) = \Gamma$.

</div>

</div>

<div class="col-span-5">

<JxgOrthogonalCircline height="300px" />

</div>

</div>

---

# Diskusi Sokratik & Latihan Kuliah 4 (Lee Subbab 3.2)

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Mengapa pemfaktoran $I_{C_{p,r}} = t_p \circ d_r \circ I \circ d_{1/r} \circ t_{-p}$ langsung membuktikan Akibat 3.12 dari Proposisi 3.10 dan 3.11 tanpa perlu mengulang aljabar koordinat sedikit pun? Kapan suatu circline $\Gamma \neq C$ dipetakan ke dirinya sendiri ($I_C(\Gamma) = \Gamma$)?

</div>

<div v-click class="latihan-box">

- **Latihan 3.6 (Lee):** Buktikan secara eksplisit identitas faktorisasi: (a) $I_{C_{0,r}} = d_r \circ I \circ d_{1/r}$, dan (b) $I_{C_{p,r}} = t_p \circ I_{C_{0,r}} \circ t_{-p}$.
- **Latihan 3.7 (Lee):** Misalkan $\phi: \mathbb{R}^2_\infty \to \mathbb{R}^2_\infty$ adalah pemetaan yang diinduksi oleh peta antipodal bola $\hat{a}(p) = -p$. Buktikan bahwa $\phi = -I$, yakni $\phi(u,v) = -\frac{1}{u^2+v^2}(u,v)$.
- **Latihan 3.8 (Lee — Distorsi Jarak Euklides di Bawah Inversi):** Buktikan bahwa untuk setiap $p, q \in \mathbb{R}^2 \setminus \{0\}$ dan $C = C_{\alpha, r}$, berlaku rumus segitiga sebangun Poincaré:
  $$d(I(p), I(q)) = \frac{d(p,q)}{|p|\,|q|} \quad \text{dan} \quad d(I_C(p), I_C(q)) = \frac{r^2\, d(p,q)}{|p - \alpha|\,|q - \alpha|}.$$

</div>
