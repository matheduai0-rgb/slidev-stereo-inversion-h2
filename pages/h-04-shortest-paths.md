# Kuliah 6: Lintasan Terpendek Sepanjang Sumbu-$y$ (Langkah 4)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="def-box">

**Definisi 4.5 (Lintasan Terpendek $\mathbb{H}^2$ — Lee).** Lintasan mulus $\gamma$ dari $p_1$ ke $p_2$ disebut **lintasan terpendek $\mathbb{H}^2$** (*$\mathbb{H}^2$-shortest path*) jika $l_{\mathbb{H}^2}(\gamma) \le l_{\mathbb{H}^2}(\gamma')$ untuk setiap lintasan $\gamma'$ dari $p_1$ ke $p_2$.

</div>

<div v-click class="thm-box">

**Proposisi 4.6 (Langkah 4 Rantai Deduktif — Lee).** Kurva vertikal $\gamma: [a,b] \to \mathbb{H}^2$, $\gamma(t) = (0,t)$ ($0 < a < b$) adalah **lintasan terpendek $\mathbb{H}^2$ tunggal** dari $(0,a)$ ke $(0,b)$, dengan panjang $l_{\mathbb{H}^2}(\gamma) = \ln(b/a)$.

</div>

<div v-click class="socratic-box">

<span class="socratic-title">Eksperimen:</span> geser **simpangan $x'$** (menambah $(x')^2$ di integran) atau **y naik-turun** (membuat $|y'| > y'$): keduanya hanya bisa menambah $l_{\mathbb{H}^2}(\delta)$. Selisihnya nol hanya jika keduanya nol.

</div>

</div>

<div class="col-span-5">

<JxgVerticalShortest height="290px" />

</div>

</div>

---

# Proposisi 4.6: Bukti Ketunggalan Lintasan Vertikal

<div class="proof-box">

**Bukti Formal Deduktif (Aturan Logika 1 Greenberg):**

1. Ambil sebarang lintasan $\delta: [c,d] \to \mathbb{H}^2$, $\delta(t) = (x(t), y(t))$ dengan $\delta(c) = (0,a)$ dan $\delta(d) = (0,b)$, sehingga $y(c) = a$, $y(d) = b$ <span class="just">(Justifikasi: Hipotesis)</span>.
2. Karena $(x'(t))^2 \ge 0$, berlaku rantai ketaksamaan integral:
   $$l_{\mathbb{H}^2}(\delta) = \int_c^d \frac{\sqrt{(x')^2+(y')^2}}{y}\, dt \ge \int_c^d \frac{|y'|}{y}\, dt \ge \int_c^d \frac{y'}{y}\, dt = \ln\frac{b}{a} = l_{\mathbb{H}^2}(\gamma)$$
   <span class="just">(Justifikasi: Kepositifan Kuadrat & Teorema Dasar Kalkulus)</span>.
3. Kesamaan terjadi **jika dan hanya jika** kedua ketaksamaan menjadi persamaan di setiap $t$, yakni $x'(t) = 0$ (sehingga $x(t) \equiv 0$) dan $y'(t) \ge 0$ (monoton naik sepanjang segmen sumbu-$y$ yang sama dengan $\gamma$) <span class="just">(Justifikasi: Syarat Kesamaan Integral Kontinu)</span>. <span class="qed">∎</span>

</div>

---

# Proposisi 4.7 & Lemma 4.8: Normalisasi ke Sumbu-$y$ (Langkah 5)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="thm-box">

**Proposisi 4.7 (Invariansi Lintasan Terpendek — Lee).** Untuk setiap $\phi \in \operatorname{Iso}(\mathbb{H}^2)$, lintasan $\gamma$ adalah lintasan terpendek $\mathbb{H}^2$ dari $p_1$ ke $p_2$ **jika dan hanya jika** $\phi(\gamma)$ adalah lintasan terpendek $\mathbb{H}^2$ dari $\phi(p_1)$ ke $\phi(p_2)$.

- *Bukti:* Untuk setiap lintasan $\delta'$ dari $\phi(p_1)$ ke $\phi(p_2)$, prapeta $\gamma' = \phi^{-1}(\delta')$ menghubungkan $p_1$ ke $p_2$, sehingga $l_{\mathbb{H}^2}(\phi(\gamma)) = l_{\mathbb{H}^2}(\gamma) \le l_{\mathbb{H}^2}(\gamma') = l_{\mathbb{H}^2}(\delta')$. <span class="qed">∎</span>

</div>

<div v-click class="thm-box">

**Lemma 4.8 (Lemma Normalisasi — Langkah 5 Rantai Deduktif).** Jika $\Gamma$ adalah garis vertikal atau lingkaran yang berpusat pada sumbu-$x$, maka terdapat isometri $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ sehingga $\phi(\Gamma)$ adalah sumbu-$y$.

</div>

</div>

<div class="col-span-5">

<JxgNormalization height="270px" />

</div>

</div>

---

# Lemma 4.8: Bukti Normalisasi

<div class="proof-box">

**Bukti Formal Deduktif (Aturan Logika 10 & 11 Greenberg):**

1. **Kasus 1 ($\Gamma$ garis vertikal $x = a$):** Translasi $\phi = t_{(-a,0)} \in \operatorname{Iso}(\mathbb{H}^2)$ memetakan $\Gamma$ ke sumbu-$y$ ($x = 0$) <span class="just">(Justifikasi: Contoh 4.1)</span>.
2. **Kasus 2 ($\Gamma$ lingkaran berpusat pada sumbu-$x$):** Pilih titik potong $q \in \Gamma \cap (\text{sumbu-}x)$, dan bentuk lingkaran satuan $C = C_{q,1}$ berpusat di $q$ <span class="just">(Justifikasi: Teorema 4.4: $I_C \in \operatorname{Iso}(\mathbb{H}^2)$)</span>.
3. Karena $q \in \Gamma$, inversi $I_C$ memetakan lingkaran $\Gamma$ menjadi **garis lurus** $I_C(\Gamma)$ <span class="just">(Justifikasi: Definisi 3.9 & Akibat 3.12: $I_C(q) = \infty$)</span>.
4. Karena $\Gamma \perp (\text{sumbu-}x)$, $I_C(\text{sumbu-}x) = \text{sumbu-}x$, dan $I_C$ mengawetkan sudut, maka garis $I_C(\Gamma)$ tegak lurus sumbu-$x$ (**garis vertikal**)! Geser ke sumbu-$y$ dengan translasi $t_{(-c,0)}$ <span class="just">(Justifikasi: Akibat 3.12 & Kasus 1)</span>. <span class="qed">∎</span>

</div>

<div v-click class="socratic-box">

<span class="socratic-title">Membaca animasi:</span> geser **langkah** dari 0 ke 3 pada slide sebelumnya: $\Gamma \to$ titik $q$ dan $C_{q,1} \to I_C(\Gamma)$ garis vertikal $x = c \to t_{(-c,0)}$ ke sumbu-$y$. Jarak $d_{\mathbb{H}^2}(A,B)$ tidak berubah di setiap langkah, karena setiap peta adalah isometri.

</div>

---

# Teorema 4.9: Lintasan Terpendek Tunggal di $\mathbb{H}^2$ (Langkah 6a)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="thm-box">

**Teorema 4.9 (Nam-Hoon Lee — Bentuk Kanonik $H \implies C$).**

- **Hipotesis $H$:** $p_1, p_2 \in \mathbb{H}^2$ adalah sebarang dua titik berbeda pada bidang hiperbolik.
- **Kesimpulan $C$:** Terdapat **lintasan terpendek $\mathbb{H}^2$ tunggal** dari $p_1$ ke $p_2$, yaitu segmen busur dari garis vertikal atau lingkaran berpusat pada sumbu-$x$ yang melalui $p_1$ dan $p_2$.

</div>

<div v-click class="socratic-box">

<span class="socratic-title">Eksperimen:</span> seret $p_1, p_2$. Jika $x_1 = x_2$ lintasannya vertikal; selain itu busur lingkaran yang pusatnya adalah titik potong pembagi tegak lurus $p_1p_2$ dengan sumbu-$x$. Panjangnya (integral numerik) selalu sama dengan rumus $2\tanh^{-1}(d/d')$ dari Latihan 4.4.

</div>

</div>

<div class="col-span-5">

<JxgGeodesic height="280px" />

</div>

</div>

---

# Teorema 4.9: Bukti Eksistensi & Ketunggalan

<div class="proof-box">

**Bukti Formal Deduktif & RAA (Aturan Logika 1 & 2 Greenberg):**

1. Melalui $p_1, p_2 \in \mathbb{H}^2$ terdapat tepat satu garis vertikal atau lingkaran $\Gamma$ berpusat pada sumbu-$x$ (pembagi tegak lurus Euklides dari $p_1p_2$ memotong sumbu-$x$ di pusat lingkaran, atau sejajar sumbu-$x$ jika $x_1 = x_2$). Misalkan $\gamma \subset \Gamma$ busur dari $p_1$ ke $p_2$ <span class="just">(Geometri Euklides Dasar)</span>.
2. Berdasarkan Lemma 4.8, terdapat $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ yang memetakan $\Gamma$ ke sumbu-$y$, sehingga $\phi(\gamma)$ adalah segmen vertikal dari $\phi(p_1)$ ke $\phi(p_2)$ <span class="just">(Lemma 4.8)</span>.
3. Berdasarkan Proposisi 4.6, $\phi(\gamma)$ adalah lintasan terpendek $\mathbb{H}^2$ dari $\phi(p_1)$ ke $\phi(p_2)$ <span class="just">(Proposisi 4.6)</span>.
4. Berdasarkan Proposisi 4.7, $\gamma = \phi^{-1}(\phi(\gamma))$ adalah lintasan terpendek dari $p_1$ ke $p_2$ <span class="just">(Proposisi 4.7)</span>.
5. **Ketunggalan (RAA):** Andaikan ada lintasan terpendek lain $\delta \neq \gamma$. Maka $\phi(\delta) \neq \phi(\gamma)$ juga lintasan terpendek dari $\phi(p_1)$ ke $\phi(p_2)$ (Proposisi 4.7), **kontradiksi** dengan ketunggalan Proposisi 4.6! <span class="just">(Aturan Logika 2 — RAA)</span>. <span class="qed">∎</span>

</div>

---

# Metrik $d_{\mathbb{H}^2}$ & Ketaksamaan Segitiga Ketat (Langkah 6b)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="def-box">

**Definisi 4.10 (Jarak Hiperbolik $d_{\mathbb{H}^2}$ — Lee).** Untuk setiap $p_1, p_2 \in \mathbb{H}^2$, $d_{\mathbb{H}^2}(p_1, p_2) = l_{\mathbb{H}^2}(\gamma)$, di mana $\gamma$ adalah lintasan terpendek $\mathbb{H}^2$ tunggal dari $p_1$ ke $p_2$. Khususnya, untuk $p_1 = (a,b)$ dan $p_2 = (a,c)$ pada garis vertikal yang sama: $d_{\mathbb{H}^2}((a,b),(a,c)) = \left|\ln\frac{c}{b}\right|$.

</div>

<div v-click class="thm-box">

**Akibat 4.11 (Ketaksamaan Segitiga untuk $\mathbb{H}^2$ — Langkah 6b).** Untuk setiap $p_1, p_2, p_3 \in \mathbb{H}^2$,
$$d_{\mathbb{H}^2}(p_1, p_3) \le d_{\mathbb{H}^2}(p_1, p_2) + d_{\mathbb{H}^2}(p_2, p_3),$$
dan **kesamaan berlaku jika dan hanya jika $p_2$ terletak pada lintasan terpendek $\mathbb{H}^2$ dari $p_1$ ke $p_3$**.

- **Bukti:** Gabungan $\delta = \gamma_{12} \cup \gamma_{23}$ menghubungkan $p_1$ ke $p_3$, sehingga $d_{12} + d_{23} = l_{\mathbb{H}^2}(\delta) \ge l_{\mathbb{H}^2}(\gamma_{13}) = d_{13}$; oleh ketunggalan Teorema 4.9, kesamaan $\iff \delta = \gamma_{13} \iff p_2 \in \gamma_{13}$. <span class="qed">∎</span>

</div>

<div v-click class="proof-box">

**Akibat 4.12 (Non-Degenerasi — Lee):** Jika $d_{\mathbb{H}^2}(p_1, p_2) = 0$, maka $p_1 = p_2$.

- *Bukti:* Petakan ke sumbu-$y$ via Lemma 4.8: $\phi(p_1) = (0,a)$, $\phi(p_2) = (0,b)$. Maka $0 = |\ln(b/a)| \implies a = b \implies p_1 = p_2$. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgGeodesic height="270px" triangle />

</div>

</div>

---

# Diskusi Sokratik & Latihan Kuliah 6 (Lee Subbab 4.2 Bagian 1)

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Bagaimana penggabungan Proposisi 4.6 (lintasan terpendek vertikal) dengan Lemma 4.8 (memindahkan circline ortogonal $\Gamma$ ke sumbu-$y$ via inversi $I_C$) berhasil **memotong kompas Kalkulus Variasi (persamaan diferensial Euler–Lagrange)** secara total dalam membuktikan Teorema 4.9? Kapan persisnya kesamaan berlaku pada Akibat 4.11?

</div>

<div v-click class="latihan-box">

- **Latihan 4.4 Bagian 1 & 2 (Rumus Eksplisit Jarak Hiperbolik — Lee):** Untuk $p_1, p_2 \in \mathbb{H}^2$, misalkan $d(p_1,p_2)$ adalah jarak Euklides biasa dan $\bar{r}(x,y) = (x,-y)$ refleksi terhadap sumbu-$x$. Buktikan rumus jarak hiperbolik
  $$d_{\mathbb{H}^2}(p_1, p_2) = 2\tanh^{-1}\left(\frac{d(p_1,p_2)}{d(p_1, \bar{r}(p_2))}\right)$$
  untuk dua kasus dasar berikut:
  1. **Kasus 1:** $p_1 = (a,b)$ dan $p_2 = (a,c)$ pada garis vertikal yang sama. *(Petunjuk: Gunakan identitas $2\tanh^{-1}\left(\frac{|c-b|}{c+b}\right) = |\ln(c/b)|$.)*
  2. **Kasus 2:** $p_1, p_2$ pada lingkaran Euklides berjejari $1/2$ berpusat di $(1/2, 0)$. *(Petunjuk: Gunakan koordinat polar $r(\theta) = \cos\theta$ dan integral $\int \frac{2}{\sin 2\theta}\, d\theta = \ln|\tan\theta|$.)*

</div>
