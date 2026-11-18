# Kuliah 5: Gradien Suhu Poincaré & Metrik $\mathbb{H}^2$ (Lee 4.1)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-6">

<div class="def-box">

**Setengah Bidang Atas ($\mathbb{H}^2$):**

$$\mathbb{H}^2 = \{(x,y) \in \mathbb{R}^2 \mid y > 0\}.$$

**Eksperimen Pikiran Poincaré:** Bayangkan suhu lokal di titik $(x,y) \in \mathbb{H}^2$ sebanding dengan ketinggian vertikal:

$$T(x,y) = y.$$

</div>

<div v-click class="proof-box">

Panjang langkah kaki makhluk hidup memuai sebanding dengan suhu $T(x,y) = y$:

- Di dekat sumbu-$x$ ($y \to 0^+$), suhu mendekati nol mutlak sehingga langkah menyusut ke nol (batas $y = 0$ berjarak tak hingga!).
- Untuk berjalan dari $p$ ke $q$, **melengkung ke atas** (memasuki daerah bersuhu tinggi, $y$ besar) membutuhkan **jauh lebih sedikit langkah** (6 langkah sepanjang busur lingkaran vs. 9 langkah sepanjang segmen datar Euklides!).

</div>

</div>

<div class="col-span-6">

<JxgPoincareSteps height="290px" />

</div>

</div>

---

# Definisi 4.1: Panjang Kurva Hiperbolik $l_{\mathbb{H}^2}(\gamma)$

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="def-box">

**Definisi 4.1 (Panjang Hiperbolik — Nam-Hoon Lee).** Misalkan $\gamma: [a,b] \to \mathbb{H}^2$ adalah kurva mulus dengan $\gamma(t) = (x(t), y(t))$. **Panjang hiperbolik** dari kurva $\gamma$ didefinisikan sebagai:

$$l_{\mathbb{H}^2}(\gamma) = \int_a^b \frac{1}{T(x,y)} \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}\, dt = \int_a^b \frac{\sqrt{x'(t)^2 + y'(t)^2}}{y(t)}\, dt.$$

</div>

<div v-click class="thm-box">

**Dua Contoh Fundamental (Lee Subbab 4.1):**

1. **Segmen Vertikal $\gamma_1(t) = (0,t)$ untuk $0 < a < b$:** Karena $x'(t) = 0$ dan $y'(t) = 1$, panjang hiperboliknya bersifat **logaritmik**:
   $$l_{\mathbb{H}^2}(\gamma_1) = \int_a^b \frac{\sqrt{0^2+1^2}}{t}\, dt = \int_a^b \frac{1}{t}\, dt = \ln\frac{b}{a}.$$
2. **Segmen Horizontal $\gamma_2(t) = (t,c)$ untuk $a < b$ pada ketinggian tetap $c > 0$:** Karena $x'(t) = 1$ dan $y'(t) = 0$, panjang hiperboliknya **berbanding terbalik dengan $c$**:
   $$l_{\mathbb{H}^2}(\gamma_2) = \int_a^b \frac{\sqrt{1^2+0^2}}{c}\, dt = \frac{b-a}{c}.$$

</div>

</div>

<div class="col-span-5">

<JxgHypLength height="270px" />

</div>

</div>
