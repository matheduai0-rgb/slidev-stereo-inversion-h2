# Definisi 3.8 & 3.9: Circline & Inversi Umum $I_C$

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="def-box">

**Definisi 3.8 (Circline pada $\mathbb{R}^2_\infty$ — Lee).** Suatu **circline** pada $\mathbb{R}^2_\infty$ adalah sebuah lingkaran di $\mathbb{R}^2$ atau himpunan $L \cup \{\infty\}$ di mana $L$ adalah garis lurus di $\mathbb{R}^2$.

- *Sifat 3 Titik:* Setiap tiga titik berbeda di $\mathbb{R}^2_\infty$ (termasuk $\infty$) dilalui oleh tepat satu circline.

</div>

<div v-click class="def-box">

**Definisi 3.9 (Inversi $I_C$ pada Circline $C$ — Lee).**

1. **Jika $C = L \cup \{\infty\}$ (garis):** $I_C(p) = \bar{r}_L(p)$ untuk $p \neq \infty$, dan $I_C(\infty) = \infty$.
2. **Jika $C = C_{q,r}$ (lingkaran berpusat $q$ berjejari $r > 0$):** Untuk $p \neq q, \infty$, $I_C(p)$ adalah titik tunggal pada sinar dari $q$ melalui $p$ sehingga $|p - q| \cdot |I_C(p) - q| = r^2$:
   $$I_C(p) = \frac{r^2}{|p-q|^2}(p - q) + q, \quad I_C(q) = \infty, \quad I_C(\infty) = q.$$

</div>

<div v-click class="thm-box">

**Sifat Dasar:** (a) $\operatorname{Fix}(I_C) = C$; (b) Involusi $I_C^{-1} = I_C$; (<span>c</span>) Mempertukarkan bagian dalam dan luar lingkaran $C$.

</div>

</div>

<div class="col-span-5">

<JxgGeneralInversion height="300px" />

</div>

</div>

---

# Faktorisasi $I_{C_{p,r}}$ (Latihan 3.6 Lee)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="thm-box">

**Faktorisasi Inversi Lingkaran Umum (Latihan 3.6 Lee).** Dengan translasi $t_p(q) = q + p$ dan dilatasi titik asal $d_r(q) = rq$ ($r > 0$), inversi pada lingkaran $C_{p,r}$ terfaktorisasi menjadi komposisi transformasi elementer:

$$\begin{aligned} I_{C_{0,r}} &= d_r \circ I \circ d_{1/r}, \\ I_{C_{p,r}} &= t_p \circ I_{C_{0,r}} \circ t_{-p} = t_p \circ d_r \circ I \circ d_{1/r} \circ t_{-p}. \end{aligned}$$

</div>

<div v-click class="proof-box">

**Membaca animasi:** figur $F$ melewati lima tahap. Translasi $t_{-p}$ membawa pusat ke $0$; dilatasi $d_{1/r}$ menjadikan $C$ lingkaran **satuan**; di situlah inversi satuan $I$ bekerja; lalu $d_r$ dan $t_p$ mengembalikan semuanya. Hasil akhir berimpit dengan $I_C(F)$ (garis putus-putus merah).

</div>

</div>

<div class="col-span-5">

<JxgFactorization height="300px" />

</div>

</div>

---

# Proposisi 3.10–3.11 & Akibat 3.12 (Langkah 1 Deduktif)

<div class="thm-box">

**Proposisi 3.10 & Proposisi 3.11 (Sifat Inversi Satuan $I$ — Lee).** Karena $I = \Phi \circ \bar{r}_G \circ \Phi^{-1}$ (Proposisi 3.7), dan masing-masing dari $\Phi$, refleksi bola $\bar{r}_G$, serta $\Phi^{-1}$ memetakan antara circline dan lingkaran bola (Teorema 3.4) serta mengawetkan sudut (Teorema 3.5, dikutip tanpa bukti), maka **inversi satuan $I$ memetakan circline ke circline dan mengawetkan sudut**!

</div>

<div v-click class="thm-box">

**Akibat 3.12 (Langkah 1 Rantai Deduktif Teorema 4.20 — Lee).**

- **Hipotesis $H$:** $C$ adalah sebarang circline pada bidang diperluas $\mathbb{R}^2_\infty$.
- **Kesimpulan $C$:** Inversi $I_C$ (a) memetakan circline ke circline, dan (b) mengawetkan sudut.

</div>

<div v-click class="proof-box">

**Bukti Formal Deduktif:**

1. Jika $C = L \cup \{\infty\}$ adalah garis, $I_C = \bar{r}_L$ adalah refleksi Euklides yang jelas mengawetkan circline dan sudut <span class="just">(Justifikasi: Sifat Refleksi Euklides)</span>.
2. Jika $C = C_{p,r}$ adalah lingkaran, gunakan faktorisasi $I_{C_{p,r}} = t_p \circ d_r \circ I \circ d_{1/r} \circ t_{-p}$. Karena translasi $t_{\pm p}$, dilatasi $d_r, d_{1/r}$, dan inversi satuan $I$ (Proposisi 3.10 & 3.11) semuanya memetakan circline ke circline dan mengawetkan sudut, komposisinya $I_{C_{p,r}}$ juga demikian <span class="just">(Justifikasi: Aturan Logika 11 & Proposisi 3.10–3.11)</span>. <span class="qed">∎</span>

</div>
