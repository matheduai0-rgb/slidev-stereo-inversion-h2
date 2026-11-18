# Kuliah 7: Definisi Intrinsik Garis Hiperbolik $H_{p_1,p_2}$

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="socratic-box">

<span class="socratic-title">Paralelisme Aksiomatik Lee:</span> Di $\mathbb{E}^2$ (Bab 1) dan $\mathbb{S}^2$ (Bab 2), "garis" yang menjadi cermin refleksi dalam Teorema Tiga Refleksi bukanlah lintasan yang menghubungkan $p_1$ dan $p_2$, melainkan **pembagi tegak lurus (tempat kedudukan ekuidistan)** dari $p_1$ dan $p_2$!

</div>

<div v-click class="def-box">

**Definisi 4.13 (Garis Hiperbolik / $\mathbb{H}^2$-line — Lee).** Untuk dua titik berbeda $p_1, p_2 \in \mathbb{H}^2$, himpunan titik yang berjarak hiperbolik sama terhadap $p_1$ dan $p_2$ disebut **garis hiperbolik**:
$$H_{p_1,p_2} = \{\, p \in \mathbb{H}^2 \mid d_{\mathbb{H}^2}(p, p_1) = d_{\mathbb{H}^2}(p, p_2) \,\}.$$

</div>

<div v-click class="thm-box">

**Tantangan Deduktif (Aturan 0 Greenberg).** Kita baru mengetahui wujud **lintasan terpendek** (Teorema 4.9), tetapi **belum** wujud $H_{p_1,p_2}$. Harus dibuktikan bahwa setiap $H_{p_1,p_2}$ juga garis vertikal atau lingkaran berpusat pada sumbu-$x$.

</div>

</div>

<div class="col-span-5">

<JxgEquidistant height="280px" />

</div>

</div>

---

# Proposisi 4.14: Kasus Kanonik Simetris (Langkah 7a)

<div class="thm-box">

**Proposisi 4.14 (Lee — Bentuk Kanonik $H \implies C$).**

- **Hipotesis $H$:** $p_1 = (-a, b)$ dan $p_2 = (a, b)$ dengan $a, b > 0$ (simetris terhadap sumbu-$y$).
- **Kesimpulan $C$:** $H_{p_1,p_2}$ adalah tepat sumbu-$y$ positif $L = \{(0, y) \mid y > 0\}$.

**Strategi:** inklusi ganda (I) $L \subset H_{p_1,p_2}$ dan (II) $H_{p_1,p_2} \subset L$.

</div>

<div v-click class="proof-box">

**Bukti Bagian I ($L \subset H_{p_1,p_2}$ — Aturan Logika 1 Greenberg):**

1. Tinjau refleksi $\bar r_L(x, y) = (-x, y)$ pada sumbu-$y$ $L$ <span class="just">(Justifikasi: Definisi Refleksi Garis Vertikal)</span>.
2. $\bar r_L \in \operatorname{Iso}(\mathbb{H}^2)$ dan $\bar r_L(p_1) = (a, b) = p_2$ <span class="just">(Justifikasi: Contoh 4.2 & Hipotesis $H$)</span>.
3. Untuk $p = (0, y) \in L$ berlaku $\bar r_L(p) = p$ <span class="just">(Justifikasi: Sifat Titik Tetap Refleksi)</span>.
4. Maka $d_{\mathbb{H}^2}(p_1, p) = d_{\mathbb{H}^2}(\bar r_L(p_1), \bar r_L(p)) = d_{\mathbb{H}^2}(p_2, p)$ <span class="just">(Justifikasi: Langkah 2, 3 & Definisi Isometri)</span>.
5. Jadi $p \in H_{p_1,p_2}$, sehingga $L \subset H_{p_1,p_2}$ <span class="just">(Justifikasi: Definisi 4.13)</span>.

</div>

---

# Proposisi 4.14: Bukti RAA $H_{p_1,p_2} \subset L$ (Langkah 7b)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="proof-box">

**Bukti Bagian II (Aturan Logika 2 — RAA):**

1. **Hipotesis RAA:** andaikan ada $q = (c, d) \in H_{p_1,p_2}$ dengan $c \neq 0$; tanpa mengurangi keumuman $c > 0$ <span class="just">(Justifikasi: Aturan Logika 2 & Simetri)</span>.
2. Lintasan terpendek dari $p_1$ ($x < 0$) ke $q$ ($x > 0$) memotong $L$ di suatu $p'$, sehingga $d(p_1, q) = d(p_1, p') + d(p', q)$ <span class="just">(Justifikasi: Teorema 4.9 & Akibat 4.11)</span>.
3. Untuk $q' = \bar r_L(q) = (-c, d)$, lintasan terpendek dari $p_1$ ke $q'$ seluruhnya di $x < 0$, jadi $p' \in L$ **tidak** terletak padanya <span class="just">(Justifikasi: Teorema 4.9 & Konveksitas Setengah Bidang)</span>.
4. Ketaksamaan segitiga ketat: $d(p_1, q') < d(p_1, p') + d(p', q')$ <span class="just">(Justifikasi: Akibat 4.11)</span>.
5. Tetapi $d(p_1, q') = d(p_2, q) = d(p_1, q) = d(p_1, p') + d(p', q) = d(p_1, p') + d(p', q')$ <span class="just">(Justifikasi: Isometri $\bar r_L$, Definisi 4.13, Langkah 2)</span>.
6. Langkah 5 kontradiksi dengan Langkah 4, sehingga $H_{p_1,p_2} = L$ <span class="just">(Justifikasi: Kesimpulan RAA)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgCanonicalRAA height="270px" />

</div>

</div>

---

# Diskusi Sokratik & Fokus Logika Kuliah 7

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Mengapa kita wajib membedakan **"lintasan terpendek yang melalui $p_1, p_2$"** (Teorema 4.9) dan **"tempat kedudukan ekuidistan $H_{p_1,p_2}$"** (Definisi 4.13) hingga Teorema 4.16 terbukti? Pada gambar RAA: mengapa $p'$ pada sumbu-$y$ mustahil terletak pada lintasan terpendek dari $p_1$ ke $q'$, dan bagaimana fakta itu memicu kontradiksi melalui Akibat 4.11?

</div>

<div v-click class="latihan-box">

- **Latihan Rekonstruksi Bukti (Persiapan Ujian Akhir):** Tulis kembali bukti Proposisi 4.14 untuk kasus $c < 0$ (titik $q = (c, d) \in H_{p_1,p_2} \setminus L$ di kiri sumbu-$y$) dengan protokol 6 alasan sah Greenberg:
  1. Lintasan terpendek manakah (dari $p_1$ ke $q$, atau dari $p_2$ ke $q$) yang dijamin memotong sumbu-$y$ di suatu $p'$?
  2. Bagaimana mendefinisikan $q' = \bar r_L(q)$ di kanan sumbu-$y$ untuk memperoleh kontradiksi $d(p_2, q') < d(p_2, p') + d(p', q')$?

</div>

---

# Kuliah 8: Lemma 4.15 — Normalisasi Simetri Dua Titik (Langkah 8a)

<div class="thm-box">

**Lemma 4.15 (Normalisasi Simetri — Lee).**

- **Hipotesis $H$:** $p_1, p_2 \in \mathbb{H}^2$ dua titik berbeda.
- **Kesimpulan $C$:** ada komposisi $\phi$ dari inversi pada lingkaran berpusat di sumbu-$x$ dan translasi horizontal sehingga $\phi(p_1) = (a, b)$ dan $\phi(p_2) = (-a, b)$ untuk suatu $a \neq 0$, $b > 0$.

</div>

<div v-click class="proof-box">

**Bukti — Kasus 1 ($p_1, p_2$ pada lingkaran $\Gamma$ berpusat di sumbu-$x$):**

1. Tulis $\pi_x(p), \pi_y(p)$ untuk koordinat $p$. Misalkan $q_1 < q_2$ titik potong $\Gamma$ dengan sumbu-$x$, dengan urutan sepanjang busur $q_1, p_1, p_2, q_2$ <span class="just">(Justifikasi: Konstruksi Gambar 4.8 Lee)</span>.
2. Untuk $\alpha \in [q_1, q_2]$, tinjau $C_{\alpha,1}$ dan fungsi selisih ketinggian
   $$f(\alpha) = \pi_y\big(I_{C_{\alpha,1}}(p_1)\big) - \pi_y\big(I_{C_{\alpha,1}}(p_2)\big) = \frac{y_1}{(x_1 - \alpha)^2 + y_1^2} - \frac{y_2}{(x_2 - \alpha)^2 + y_2^2}$$
   <span class="just">(Justifikasi: Definisi 3.9)</span>.
3. Penyebut $(x_i - \alpha)^2 + y_i^2 \ge y_i^2 > 0$, jadi $f$ **kontinu** pada $[q_1, q_2]$ <span class="just">(Justifikasi: Kekontinuan Fungsi Rasional)</span>.

</div>

---

# Lemma 4.15: Argumen Nilai Antara (IVT) & Kasus 2 (Langkah 8b)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-6">

<div class="proof-box">

4. **$\alpha = q_1$:** $\Gamma$ melalui pusat $q_1$, jadi $I_{C_{q_1,1}}(\Gamma)$ garis vertikal. Karena $|p_1 - q_1| < |p_2 - q_1|$ dan $|I(p) - q_1| = 1/|p - q_1|$: $f(q_1) > 0$ <span class="just">(Justifikasi: Definisi 3.9)</span>.
5. **$\alpha = q_2$:** secara simetris $f(q_2) < 0$ <span class="just">(Justifikasi: Simetri di $q_2$)</span>.
6. **IVT:** ada $\alpha_0 \in (q_1, q_2)$ dengan $f(\alpha_0) = 0$, yakni kedua bayangan setinggi $b > 0$ <span class="just">(Justifikasi: Teorema Nilai Antara)</span>.
7. Pilih translasi horizontal $t$ yang membuat jumlah koordinat-$x$ bayangan nol; maka $\phi = t \circ I_{C_{\alpha_0,1}}$ memenuhi <span class="just">(Justifikasi: Contoh 4.1)</span>.
8. **Kasus 2 ($p_1, p_2$ pada garis vertikal):** inversi $I_1$ memetakan garis itu ke lingkaran berpusat di sumbu-$x$; terapkan Kasus 1: $\phi = t \circ I_{C_{\alpha_0,1}} \circ I_1$ <span class="just">(Justifikasi: Aturan Logika 11)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-6">

<JxgSymmetryIVT height="235px" />

</div>

</div>

---

# Teorema 4.16: Karakterisasi Garis Hiperbolik (Langkah 9)

<div class="thm-box">

**Teorema 4.16 (Karakterisasi $\mathbb{H}^2$-lines — Lee).**

- **Hipotesis $H$:** $H_{p_1,p_2}$ sebarang garis hiperbolik ($p_1 \neq p_2$).
- **Kesimpulan $C$:** $H_{p_1,p_2}$ adalah **garis vertikal** atau **lingkaran berpusat pada sumbu-$x$**.

</div>

<div v-click class="proof-box">

**Bukti Formal Deduktif (Aturan Logika 1 Greenberg):**

1. Ada $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ (inversi berpusat di sumbu-$x$ dan translasi horizontal) dengan $\phi(p_1) = (a, b)$, $\phi(p_2) = (-a, b)$ <span class="just">(Justifikasi: Lemma 4.15)</span>.
2. $H_{\phi(p_1),\phi(p_2)}$ adalah sumbu-$y$ <span class="just">(Justifikasi: Proposisi 4.14)</span>.
3. Isometri mengawetkan $d_{\mathbb{H}^2}$, jadi $\phi(H_{p_1,p_2}) = H_{\phi(p_1),\phi(p_2)}$ dan $H_{p_1,p_2} = \phi^{-1}(\text{sumbu-}y)$ <span class="just">(Justifikasi: Definisi 4.13 & Invariansi Isometri)</span>.
4. $\phi^{-1}$ memetakan circline ke circline, mengawetkan sumbu-$x$ dan sudut ($90^\circ$ terhadap sumbu-$x$), sehingga $\phi^{-1}(\text{sumbu-}y)$ garis vertikal atau lingkaran ortogonal terhadap sumbu-$x$ <span class="just">(Justifikasi: Akibat 3.12)</span>. <span class="qed">∎</span>

</div>

<div v-click class="socratic-box">

<span class="socratic-title">Jembatan ke Kuliah 9:</span> Oleh Teorema 4.16 & Teorema 4.4, setiap $H = H_{p_1,p_2}$ adalah circline ortogonal, sehingga **inversi $I_{H_{p_1,p_2}}$ merupakan isometri $\mathbb{H}^2$**. Rumus eksplisitnya: $y_2|q - p_1|^2 = y_1|q - p_2|^2$ (coba di gambar Definisi 4.13).

</div>

---

# Diskusi Sokratik & Latihan Kuliah 8 (Lee Subbab 4.2 Bagian 3)

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Pada gambar Lemma 4.15: saat pusat inversi $\alpha$ mendekati $q_1$, mengapa $\pi_y(I_{C_{\alpha,1}}(p_1))$ melesat jauh lebih tinggi daripada $\pi_y(I_{C_{\alpha,1}}(p_2))$, dan mengapa keadaan berbalik saat $\alpha$ mendekati $q_2$? Pada bukti Teorema 4.16, sifat mana dari $\phi^{-1}$ yang menjamin $\phi^{-1}(\text{sumbu-}y)$ tetap tegak lurus sumbu-$x$?

</div>

<div v-click class="latihan-box">

- **Latihan 4.4 Bagian 3 (Rumus Jarak Global — Lee):** Buktikan bahwa untuk **sebarang** $p_1, p_2 \in \mathbb{H}^2$,
  $$d_{\mathbb{H}^2}(p_1, p_2) = 2\tanh^{-1}\frac{d(p_1, p_2)}{d(p_1, \bar r(p_2))}, \qquad \bar r(x, y) = (x, -y).$$
  *Petunjuk:* (1) Jika $p_1, p_2$ pada lingkaran berpusat $(a, 0)$ berjejari $r$, gunakan $t_{(-a,0)}$ dan $d_{1/(2r)}$ untuk mereduksi ke Kasus 2 (lingkaran pusat $(\tfrac12, 0)$, jejari $\tfrac12$). (2) Tunjukkan rasio $d(p_1,p_2)/d(p_1,\bar r(p_2))$ **invarian** di bawah $t_{(a,0)}$ dan $d_r$.

</div>
