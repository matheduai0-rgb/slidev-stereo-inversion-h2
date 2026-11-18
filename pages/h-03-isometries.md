# Definisi 4.2 & Isometri Elementer $\mathbb{H}^2$ (Langkah 2a Deduktif)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="def-box">

**Definisi 4.2 (Isometri Bidang Hiperbolik — Lee).** Pemetaan bijektif $\phi: \mathbb{H}^2 \to \mathbb{H}^2$ disebut **isometri bidang hiperbolik** (ditulis $\phi \in \operatorname{Iso}(\mathbb{H}^2)$) jika mengawetkan panjang hiperbolik setiap kurva mulus $\gamma$ pada $\mathbb{H}^2$:

$$l_{\mathbb{H}^2}(\phi(\gamma)) = l_{\mathbb{H}^2}(\gamma).$$

</div>

<div v-click class="thm-box">

**Tiga Keluarga Isometri Afin Elementer (Contoh 4.1, 4.2, 4.3 Lee):**

1. **Translasi Horizontal $t_{(a,0)}(x,y) = (x+a, y)$ ($a \in \mathbb{R}$):** Untuk $\delta(t) = (x(t)+a, y(t))$, berlaku $\frac{d(x+a)}{dt} = \frac{dx}{dt}$ dan koordinat vertikal tetap $y(t)$, sehingga $l_{\mathbb{H}^2}(t_{(a,0)}(\gamma)) = l_{\mathbb{H}^2}(\gamma) \implies t_{(a,0)} \in \operatorname{Iso}(\mathbb{H}^2)$.
2. **Refleksi Garis Vertikal $\bar{r}_L(x,y) = (2a - x, y)$ (cermin $L: x = a$):** Berlaku $\left(\frac{d(2a-x)}{dt}\right)^2 = \left(-\frac{dx}{dt}\right)^2 = \left(\frac{dx}{dt}\right)^2$ dan $y(t)$ tetap, sehingga $\bar{r}_L \in \operatorname{Iso}(\mathbb{H}^2)$.
3. **Dilatasi (Rescaling) Titik Asal $d_r(x,y) = (rx, ry)$ ($r > 0$):**
   $$\begin{aligned} l_{\mathbb{H}^2}(d_r(\gamma)) &= \int_a^b \frac{\sqrt{(rx')^2 + (ry')^2}}{ry}\, dt = \int_a^b \frac{r\sqrt{(x')^2 + (y')^2}}{ry}\, dt \\ &= l_{\mathbb{H}^2}(\gamma) \implies d_r \in \operatorname{Iso}(\mathbb{H}^2)! \end{aligned}$$

</div>

</div>

<div class="col-span-5">

<JxgIsometryLab height="250px" map="t" />

</div>

</div>

---

# Proposisi 4.3: Inversi Satuan $I \in \operatorname{Iso}(\mathbb{H}^2)$ (Langkah 2b)

<div class="thm-box">

**Proposisi 4.3 (Nam-Hoon Lee — Bentuk Kanonik $H \implies C$).**

- **Hipotesis $H$:** $I(x,y) = \frac{1}{x^2+y^2}(x,y)$ adalah inversi pada lingkaran satuan berpusat di titik asal $0$.
- **Kesimpulan $C$:** $I$ merupakan isometri bidang hiperbolik ($I \in \operatorname{Iso}(\mathbb{H}^2)$).

</div>

<div v-click class="proof-box">

**Bukti Formal Deduktif (Aturan Logika 1 Greenberg):**

1. Untuk $(x,y) \in \mathbb{H}^2$ ($y > 0$), komponen vertikal $I(x,y)$ adalah $\frac{y}{x^2+y^2} > 0$, dan karena $I^{-1} = I$, maka $I: \mathbb{H}^2 \to \mathbb{H}^2$ adalah bijeksi <span class="just">(Justifikasi: Definisi 3.9 & Sifat Involusi)</span>.
2. Misalkan $\gamma(t) = (x(t), y(t))$ kurva mulus di $\mathbb{H}^2$. Dengan aturan hasil bagi turunan:
   $$\frac{d}{dt}\left(\frac{x}{x^2+y^2}\right) = \frac{(y^2-x^2)x' - 2xyy'}{(x^2+y^2)^2}, \qquad \frac{d}{dt}\left(\frac{y}{x^2+y^2}\right) = \frac{(x^2-y^2)y' - 2xyx'}{(x^2+y^2)^2}$$
   <span class="just">(Justifikasi: Aturan Turunan Kalkulus)</span>.

</div>

---

# Proposisi 4.3: Bukti (lanjutan) & Eksperimen

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="proof-box">

3. Jumlahkan kuadrat kedua turunan tersebut; suku silang $-4xy(y^2-x^2)x'y'$ saling meniadakan dan diperoleh identitas aljabar eksak:
   $$\begin{aligned} \left(\tfrac{d}{dt}\tfrac{x}{x^2+y^2}\right)^2 + \left(\tfrac{d}{dt}\tfrac{y}{x^2+y^2}\right)^2 &= \frac{(x^2+y^2)^2((x')^2+(y')^2)}{(x^2+y^2)^4} \\ &= \frac{(x')^2+(y')^2}{(x^2+y^2)^2} \end{aligned}$$
   <span class="just">(Justifikasi: Aljabar Polinomial)</span>.
4. Substitusikan ke integral panjang hiperbolik $l_{\mathbb{H}^2}(I(\gamma))$:
   $$\begin{aligned} l_{\mathbb{H}^2}(I(\gamma)) &= \int_a^b \frac{\frac{1}{x^2+y^2}\sqrt{(x')^2+(y')^2}}{\frac{y}{x^2+y^2}}\, dt \\ &= \int_a^b \frac{\sqrt{(x')^2+(y')^2}}{y}\, dt = l_{\mathbb{H}^2}(\gamma) \end{aligned}$$
   <span class="just">(Justifikasi: Definisi 4.1)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgIsometryLab height="250px" map="I" />

</div>

</div>

---

# Teorema 4.4: Inversi Ortogonal adalah Isometri $\mathbb{H}^2$ (Langkah 3)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="thm-box">

**Teorema 4.4 (Nam-Hoon Lee — Bentuk Kanonik $H \implies C$).**

- **Hipotesis $H$:** $C$ adalah sebuah garis vertikal atau sebuah lingkaran yang titik pusatnya terletak pada sumbu-$x$.
- **Kesimpulan $C$:** Pemetaan inversi $I_C$ adalah suatu isometri bidang hiperbolik ($I_C \in \operatorname{Iso}(\mathbb{H}^2)$).

</div>

<div v-click class="proof-box">

**Bukti Formal Berdasarkan Kasus (Aturan Logika 10 & 11 Greenberg):**

1. **Kasus 1 ($C = L \cup \{\infty\}$ adalah garis vertikal $x = a$):** Berdasarkan Definisi 3.9, $I_C = \bar{r}_L$ adalah refleksi pada garis vertikal $x = a$, yang telah dibuktikan merupakan elemen $\operatorname{Iso}(\mathbb{H}^2)$ <span class="just">(Justifikasi: Contoh 4.2 Lee)</span>.
2. **Kasus 2 ($C = C_{0,r}$ berpusat di titik asal):** Berdasarkan Latihan 3.6(a), $I_{C_{0,r}} = d_r \circ I \circ d_{1/r}$. Karena $d_r, d_{1/r} \in \operatorname{Iso}(\mathbb{H}^2)$ (Contoh 4.3) dan $I \in \operatorname{Iso}(\mathbb{H}^2)$ (Proposisi 4.3), komposisinya $I_{C_{0,r}}$ adalah isometri $\mathbb{H}^2$ <span class="just">(Justifikasi: Sifat Grup Komposisi Isometri)</span>.
3. **Kasus 3 ($C = C_{(a,0),r}$ berpusat di $(a,0)$):** Berdasarkan Latihan 3.6(b), $I_{C_{(a,0),r}} = t_{(a,0)} \circ I_{C_{0,r}} \circ t_{(-a,0)}$. Karena $t_{(\pm a,0)} \in \operatorname{Iso}(\mathbb{H}^2)$ (Contoh 4.1) dan $I_{C_{0,r}} \in \operatorname{Iso}(\mathbb{H}^2)$ (Kasus 2), maka $I_C \in \operatorname{Iso}(\mathbb{H}^2)$ <span class="just">(Justifikasi: Aturan Logika 11 — Proof by Cases)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgIsometryLab height="250px" map="IC" />

</div>

</div>

---

# Diskusi Sokratik & Latihan Kuliah 5 (Lee Subbab 4.1)

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Dalam geometri Euklides, dilatasi $d_r(x,y) = (rx, ry)$ meregangkan jarak sebesar faktor $r$. Mengapa di $\mathbb{H}^2$ pemetaan $d_r$ justru mengawetkan panjang hiperbolik secara eksak, sedangkan translasi vertikal $(x,y) \mapsto (x, y+b)$ ($b \neq 0$) gagal menjadi isometri? *(Coba tombol $(x, y+b)$ pada eksperimen isometri.)*

</div>

<div v-click class="latihan-box">

- **Latihan 4.1 (Lee):** Misalkan $L$ adalah segmen garis lurus Euklides yang menghubungkan $(1, \sqrt{3})$ dan $(0,2)$, sedangkan $C$ adalah busur lingkaran Euklides berjejari $2$ berpusat di $0$ yang menghubungkan kedua titik tersebut. Tunjukkan secara eksplisit bahwa $l_{\mathbb{H}^2}(L) > l_{\mathbb{H}^2}(C)$! *(Gunakan rumus $\int \frac{dx}{\sin x} = \ln|\tan(x/2)|$; diperoleh $l_{\mathbb{H}^2}(C) = \ln\sqrt{3} \approx 0.5493 < l_{\mathbb{H}^2}(L) \approx 0.5656$.)*
- **Latihan 4.2 (Lee):** Misalkan $C$ adalah kurva yang menghubungkan titik asal $(0,0)$ pada sumbu-$x$ dengan titik $(0,1) \in \mathbb{H}^2$. Buktikan bahwa $C$ **tidak memiliki panjang hiperbolik yang berhingga** ($l_{\mathbb{H}^2}(C) = \infty$). Apa makna geometrisnya bagi sumbu-$x$?
- **Latihan 4.3 (Homogenitas $\mathbb{H}^2$ — Lee):** Untuk setiap pasang titik $p, q \in \mathbb{H}^2$, buktikan bahwa terdapat suatu isometri $\phi \in \operatorname{Iso}(\mathbb{H}^2)$ sehingga $\phi(p) = q$. *(Petunjuk: Gunakan komposisi translasi horizontal $t_{(a,0)}$ dan dilatasi $d_r$.)*

</div>
