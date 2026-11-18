# Kuliah 9: Lemma 4.17 — Pertukaran Inversi (Langkah 10a)

<div class="socratic-box">

<span class="socratic-title">Mengapa $I_{H_{p_1,p_2}}$ "refleksi hiperbolik"?</span> Oleh Teorema 4.16 & 4.4, $H_{p_1,p_2}$ adalah garis vertikal atau lingkaran berpusat di sumbu-$x$, sehingga $I_{H_{p_1,p_2}} \in \operatorname{Iso}(\mathbb{H}^2)$. Untuk bukti Teorema Tiga Inversi kita perlu: **inversi terhadap $H_{p_1,p_2}$ mempertukarkan $p_1$ dan $p_2$**.

</div>

<div v-click class="thm-box">

**Lemma 4.17 (Inversion Swap Lemma — Lee).** **Hipotesis $H$:** $H_{p_1,p_2}$ garis hiperbolik dari $p_1 \neq p_2$. **Kesimpulan $C$:** $I_{H_{p_1,p_2}}(p_1) = p_2$.

</div>

<div v-click class="proof-box">

**Bukti — Tahap I (Normalisasi ke Sumbu-$y$):**

1. Misalkan $\Gamma$ garis vertikal atau lingkaran berpusat di sumbu-$x$ melalui $p_1, p_2$. Ada $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ dengan $\phi(\Gamma) = \text{sumbu-}y$ <span class="just">(Justifikasi: Lemma 4.8)</span>.
2. $\phi(H_{p_1,p_2}) = H_{\phi(p_1),\phi(p_2)}$; karena $\phi(p_1), \phi(p_2)$ pada sumbu-$y$, bisektor ini adalah **setengah lingkaran berpusat di $0$** <span class="just">(Justifikasi: Simetri Sumbu-$y$ & Teorema 4.16)</span>.
3. Pilih $q_1 = (a, b)$, $q_2 = (-a, b)$ ($a > 0$) pada setengah lingkaran itu. Maka $H_{q_1,q_2} = \text{sumbu-}y = \phi(\Gamma)$, sehingga $\phi^{-1}(q_1), \phi^{-1}(q_2) \in H_{p_1,p_2}$ dan $H_{\phi^{-1}(q_1),\phi^{-1}(q_2)} = \Gamma$ <span class="just">(Justifikasi: Proposisi 4.14 & Invariansi Isometri)</span>.

</div>

---

# Lemma 4.17: Bukti Tahap II & Eksperimen

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="proof-box">

**Tahap II (menunjukkan $p := I_{H_{p_1,p_2}}(p_1) = p_2$)**, tulis $I = I_{H_{p_1,p_2}}$:

4. $p_1 \notin H_{p_1,p_2} = \operatorname{Fix}(I)$, jadi $p \neq p_1$ <span class="just">(Justifikasi: Definisi 4.13)</span>.
5. $\phi^{-1}(q_i)$ difiksasi $I$ dan $q_1, q_2$ simetris terhadap sumbu-$y$ (tempat $\phi(p_1)$):
   $$d(\phi^{-1}q_1, p) = d(\phi^{-1}q_1, p_1) = d(q_1, \phi p_1) = d(q_2, \phi p_1) = d(\phi^{-1}q_2, p)$$
   <span class="just">(Justifikasi: Teorema 4.4, $I^2 = \mathrm{id}$, Simetri)</span>.
6. Jadi $p \in H_{\phi^{-1}q_1, \phi^{-1}q_2} = \Gamma$, sehingga $\phi(p)$ pada sumbu-$y$ <span class="just">(Justifikasi: Definisi 4.13 & Langkah 3)</span>.
7. Untuk $q = \text{sumbu-}y \cap H_{\phi p_1, \phi p_2}$: $d(q, \phi p) = d(q, \phi p_1) = d(q, \phi p_2)$ <span class="just">(Justifikasi: Isometri $\phi, I$)</span>.
8. Tiga titik $\phi p, \phi p_1, \phi p_2$ pada sumbu-$y$ berjarak sama ke $q$: $\phi p \in \{\phi p_1, \phi p_2\}$; karena $p \neq p_1$, $p = p_2$ <span class="just">(Justifikasi: Bijektivitas $\phi$)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgSwap height="270px" />

</div>

</div>

---

# Lemma 4.18 & Teorema 4.19: Kekakuan Tiga Titik (Langkah 11)

<div class="def-box">

**Definisi (Kolinearitas Hiperbolik — Lee 4.3).** Titik-titik di $\mathbb{H}^2$ **segaris** jika terletak pada satu garis hiperbolik $H_{p,q}$.

</div>

<div v-click class="thm-box">

**Lemma 4.18 (Pelestarian Ketidaksegarisan).** Setiap $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ memetakan tiga titik tak segaris ke tiga titik tak segaris.

- **Bukti RAA:** andaikan $\phi(p_i) \in H_{p,q}$ ($i = 1,2,3$). Maka $d(p, \phi p_i) = d(q, \phi p_i)$, sehingga $d(\phi^{-1}p, p_i) = d(\phi^{-1}q, p_i)$, yakni $p_1, p_2, p_3 \in H_{\phi^{-1}p, \phi^{-1}q}$ (segaris): kontradiksi. <span class="qed">∎</span>

</div>

<div v-click class="thm-box">

**Teorema 4.19 (Tiga Titik untuk $\mathbb{H}^2$).** Jika $\phi, \psi \in \operatorname{Iso}(\mathbb{H}^2)$ berimpit pada tiga titik tak segaris $p_1, p_2, p_3$, maka $\phi = \psi$.

1. $\phi(p_1), \phi(p_2), \phi(p_3)$ tak segaris <span class="just">(Justifikasi: Lemma 4.18)</span>.
2. **RAA:** andaikan $\phi(p) \neq \psi(p)$ untuk suatu $p$; bentuk $H = H_{\phi(p), \psi(p)}$ <span class="just">(Justifikasi: Aturan 2 & Definisi 4.13)</span>.
3. $d(\phi p, \phi p_i) = d(p, p_i) = d(\psi p, \psi p_i) = d(\psi p, \phi p_i)$, jadi $\phi(p_i) \in H$ (segaris): kontradiksi dengan Langkah 1 <span class="just">(Justifikasi: Kesimpulan RAA)</span>. <span class="qed">∎</span>

</div>

---

# Diskusi Sokratik & Latihan Kuliah 9 (Lee Subbab 4.3 Bagian 1)

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Di geometri Euklides dan bola, jelas bahwa pencerminan terhadap pembagi tegak lurus $p_1p_2$ memetakan $p_1$ ke $p_2$. Mengapa di $\mathbb{H}^2$ bukti Lemma 4.17 membutuhkan normalisasi ke sumbu-$y$ via Lemma 4.8, dan bagaimana $\phi(\Gamma) = \text{sumbu-}y$ mengunci argumennya?

</div>

<div v-click class="latihan-box">

- **Latihan 4.5 (Titik Tetap pada Garis Hiperbolik — Lee):** Jika $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ memfiksasi dua titik berbeda $p, q$, buktikan bahwa **setiap titik** pada garis hiperbolik melalui $p$ dan $q$ juga titik tetap $\phi$.
- **Latihan 4.6 (Rumus Konjugasi — Lee):** Untuk $\phi, \psi \in \operatorname{Iso}(\mathbb{H}^2)$ definisikan ${}^{\phi}\psi = \phi \circ \psi \circ \phi^{-1}$.
  (a) Untuk inversi $I_H, I_M$ pada garis hiperbolik, buktikan ${}^{I_M}I_H = I_{H'}$ dengan $H' = I_M(H)$ *(gunakan Lemma 3.15)*.
  (b) Untuk **sebarang** $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ dan garis hiperbolik $H$: $\;{}^{\phi}I_H = \phi \circ I_H \circ \phi^{-1} = I_{\phi(H)}$.

</div>

---

# Kuliah 10: Teorema 4.20 — Kasus 1 & Kasus 2 (Langkah 12a)

<div class="thm-box">

**Teorema 4.20 (Tiga Inversi untuk Bidang Hiperbolik — Lee).** **Hipotesis $H$:** $\phi \in \operatorname{Iso}(\mathbb{H}^2)$. **Kesimpulan $C$:** $\phi$ adalah komposisi **paling banyak tiga inversi** pada garis hiperbolik.

Pilih tiga titik tak segaris $p_1, p_2, p_3$ dan bagi kasus menurut banyaknya $p_i$ dengan $\phi(p_i) = p_i$ (Aturan 10 & 11 Greenberg).

</div>

<div v-click class="proof-box">

- **Kasus 1 (ketiganya tetap):** dengan $\psi = \mathrm{id}$, $\phi = \mathrm{id}$ (**0 inversi**) <span class="just">(Justifikasi: Teorema 4.19)</span>.
- **Kasus 2 ($\phi(p_1) = p_1$, $\phi(p_2) = p_2$, $\phi(p_3) \neq p_3$):**
  1. $H = H_{p_3, \phi(p_3)}$ dan $I_H \in \operatorname{Iso}(\mathbb{H}^2)$ <span class="just">(Justifikasi: Teorema 4.16 & 4.4)</span>.
  2. $d(p_3, p_i) = d(\phi p_3, \phi p_i) = d(\phi p_3, p_i)$, jadi $p_1, p_2 \in H$ <span class="just">(Justifikasi: Definisi 4.13)</span>.
  3. $\psi = I_H \circ \phi$ memfiksasi $p_1, p_2$ (keduanya di $H = \operatorname{Fix}(I_H)$) <span class="just">(Justifikasi: Langkah 2)</span>.
  4. $\psi(p_3) = I_H(\phi(p_3)) = p_3$ <span class="just">(Justifikasi: Lemma 4.17)</span>.
  5. $\psi = \mathrm{id}$, sehingga $\phi = I_H^{-1} = I_H$ (**1 inversi**) <span class="just">(Justifikasi: Teorema 4.19 & Involusi)</span>.

</div>

---

# Teorema 4.20: Kasus 3 & Kasus 4 (Langkah 12b)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-6">

<div class="proof-box">

- **Kasus 3 ($\phi(p_1) = p_1$ saja):**
  1. $d(p_2, p_1) = d(\phi p_2, p_1)$, jadi $p_1 \in M = H_{p_2, \phi(p_2)}$ <span class="just">(Justifikasi: Definisi 4.13)</span>.
  2. $\phi' = I_M \circ \phi$ memfiksasi $p_1$ ($p_1 \in M$) dan $p_2$ <span class="just">(Justifikasi: Lemma 4.17)</span>.
  3. Kasus 1 atau 2: $\phi' = \mathrm{id}$ atau $I_H$, jadi $\phi = I_M$ atau $I_M \circ I_H$.
- **Kasus 4 (tak ada titik tetap):**
  1. $N = H_{p_1, \phi(p_1)}$, $\phi'' = I_N \circ \phi$ memfiksasi $p_1$ <span class="just">(Justifikasi: Lemma 4.17)</span>.
  2. Kasus 1–3: $\phi = I_N$, $I_N \circ I_M$, atau $I_N \circ I_M \circ I_H$ (**paling banyak 3**). <span class="qed">∎</span>

</div>

</div>

<div class="col-span-6">

<JxgThreeInversions height="225px" />

</div>

</div>

---

# Akibat 4.21: Konformalitas & Orientasi

<div class="thm-box">

**Akibat 4.21 (Setiap Isometri Hiperbolik Mengawetkan Sudut — Lee).** Setiap $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ mengawetkan sudut antara kurva mulus di $\mathbb{H}^2$.

- **Bukti:** $\phi$ komposisi $\le 3$ inversi (Teorema 4.20); setiap $I_C$ mengawetkan sudut (Akibat 3.12(b)); komposisi pengawet sudut mengawetkan sudut. <span class="qed">∎</span>

</div>

<div v-click class="def-box">

**Dikotomi Orientasi pada $\operatorname{Iso}(\mathbb{H}^2)$:**

- $\operatorname{Iso}^+(\mathbb{H}^2)$: komposisi **genap** (0 atau 2) inversi, **mengawetkan orientasi**.
- $\operatorname{Iso}^-(\mathbb{H}^2)$: komposisi **ganjil** (1 atau 3) inversi, **membalik orientasi**.

</div>

<div v-click class="proof-box">

**Rumus Konjugasi $\phi \circ I_H \circ \phi^{-1} = I_{\phi(H)}$ (Latihan 4.6b).** Untuk $H = H_{p_1,p_2}$, $\phi(H) = H_{\phi p_1, \phi p_2}$. Isometri $\psi = \phi \circ I_H \circ \phi^{-1}$ memfiksasi setiap titik $\phi(H)$ (Kasus 2 Teorema 4.20) tetapi mempertukarkan $\phi p_1 \leftrightarrow \phi p_2$, sehingga $\psi \neq \mathrm{id}$ dan $\psi = I_{\phi(H)}$.

</div>

---

# Dekomposisi Translasi & Dilatasi menjadi Dua Inversi (Latihan 4.7)

<div class="proof-box">

1. **Translasi horizontal $t_{(a,0)}(x, y) = (x + a, y)$:** untuk $L_1: x = 0$ dan $L_2: x = a/2$,
   $$(\bar r_{L_2} \circ \bar r_{L_1})(x, y) = \bar r_{L_2}(-x, y) = (x + a, y) = t_{(a,0)}(x, y).$$
2. **Dilatasi $d_r(p) = rp$ ($r > 0$):** untuk $C_1 = C_{0,1}$ dan $C_2 = C_{0,\sqrt r}$,
   $$(I_{C_2} \circ I_{C_1})(p) = I_{C_2}\!\left(\frac{p}{|p|^2}\right) = \frac{(\sqrt r)^2}{\left|p/|p|^2\right|^2}\,\frac{p}{|p|^2} = r|p|^2\,\frac{p}{|p|^2} = rp = d_r(p).$$

</div>

<div v-click class="socratic-box">

<span class="socratic-title">Eksperimen:</span> pada gambar Teorema 4.20 pilih **translasi $t_{(1,0)}$**: algoritma Lee memakai tepat **2 inversi** (orientasi terawetkan). **Refleksi** memberi 1 inversi, **$\phi = \mathrm{id}$** memberi 0, dan isometri **umum** pembalik orientasi memberi 3.

</div>

---

# Sintesis Puncak: Rantai Deduktif 12 Langkah Menuju Teorema 4.20

<div class="ma-table text-[0.72rem]">

| No | Teorema / Lemma (Lee) | Peran dalam Rantai Bukti Teorema 4.20 |
| :-: | --- | --- |
| 1 | **Akibat 3.12** (3.2) | $I_C$ involutif, memfiksasi $C$, mengawetkan circline & sudut. |
| 2 | **Contoh 4.1–4.3 & Prop. 4.3** | $t_{(a,0)}, \bar r_L, d_r$ dan $I(x,y) = (x,y)/(x^2+y^2)$ mengawetkan $l_{\mathbb{H}^2}$. |
| 3 | **Teorema 4.4** (4.1) | Via $I_{C_{(a,0),r}} = t_{(a,0)} \circ d_r \circ I \circ d_{1/r} \circ t_{(-a,0)}$, setiap inversi ortogonal $I_C \in \operatorname{Iso}(\mathbb{H}^2)$. |
| 4 | **Proposisi 4.6** (4.2) | Segmen vertikal adalah lintasan terpendek tunggal, $l_{\mathbb{H}^2} = \lvert\ln(b/a)\rvert$. |
| 5 | **Lemma 4.8** | Circline ortogonal $\Gamma$ dipetakan ke sumbu-$y$ oleh $\phi = t \circ I_{C_{q,1}}$. |
| 6 | **Teorema 4.9 & Akibat 4.11** | Lintasan terpendek tunggal; metrik $d_{\mathbb{H}^2}$ & ketaksamaan segitiga ketat. |
| 7 | **Proposisi 4.14** | Untuk $(-a,b), (a,b)$: $H_{p_1,p_2}$ = sumbu-$y$ (RAA & Akibat 4.11). |
| 8 | **Lemma 4.15** | Sebarang $p_1 \neq p_2$ dipetakan ke $(a,b), (-a,b)$ (IVT). |
| 9 | **Teorema 4.16** | $H_{p_1,p_2} = \phi^{-1}(\text{sumbu-}y)$ garis vertikal/lingkaran ortogonal, jadi $I_{H_{p_1,p_2}} \in \operatorname{Iso}(\mathbb{H}^2)$. |
| 10 | **Lemma 4.17** | $I_{H_{p_1,p_2}}(p_1) = p_2$. |
| 11 | **Lemma 4.18 & Teorema 4.19** | Isometri mengawetkan ketidaksegarisan; berimpit di 3 titik tak segaris berarti sama. |
| 12 | **Teorema 4.20** | Reduksi 4 kasus: setiap $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ komposisi $\le 3$ inversi. |

</div>

---

# Diskusi Sokratik & Latihan Kuliah 10 (Lee Subbab 4.3 Bagian 2)

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Telusuri Kasus 1–4 Teorema 4.20: di baris mana tepatnya Teorema 4.4, Teorema 4.16, Lemma 4.17, dan Teorema 4.19 dipanggil pada tiap kasus? Mengapa Kasus 4 dijamin berhenti dalam paling banyak **tiga** inversi?

</div>

<div v-click class="latihan-box">

- **Latihan 4.7 (Lee):** Buktikan secara aljabar bahwa setiap $t_{(a,0)}$ dan setiap $d_r$ ($r > 0$) adalah komposisi tepat dua inversi pada garis hiperbolik.
- **Latihan 4.8 (Ultraparalel & Dilatasi — Lee):** Garis hiperbolik $L, M$ **ultraparalel** jika ada garis ketiga yang tegak lurus keduanya. Untuk $\phi = I_M \circ I_L$, buktikan ada $\psi \in \operatorname{Iso}(\mathbb{H}^2)$ dengan $\psi \circ \phi \circ \psi^{-1} = d_r$ untuk suatu $r > 0$. *(Petunjuk: petakan garis tegak lurus persekutuan ke sumbu-$y$ via Lemma 4.8.)*
- **Latihan 4.9 (Batas Ideal $\mathbb{R}_\infty$ & Möbius — Lee):** (1) Jika $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ memfiksasi titik batas $(1,0), (0,0), \infty$, buktikan $\phi = \mathrm{id}$. (2) Untuk setiap $f(x) = \frac{ax + b}{cx + d}$ pada $\mathbb{R}_\infty$, tunjukkan ada isometri tunggal $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ yang menginduksi $f$ pada sumbu-$x$.

</div>
