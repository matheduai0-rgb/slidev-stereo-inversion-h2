# Teorema 3.4: Preservasi Lingkaran & Garis (Arah Maju)

<div class="thm-box">

**Teorema 3.4 (Nam-Hoon Lee).** Proyeksi stereografis $\Phi$ memetakan lingkaran pada $\mathbb{S}^2$ yang memuat kutub utara $N$ menjadi garis lurus Euklides di $\mathbb{R}^2$, dan memetakan lingkaran pada $\mathbb{S}^2$ yang tidak memuat $N$ menjadi lingkaran di $\mathbb{R}^2$. Sebaliknya, prapeta $\Phi^{-1}$ dari sebarang lingkaran atau garis di $\mathbb{R}^2$ adalah lingkaran pada $\mathbb{S}^2$.

</div>

<div v-click class="proof-box">

**Bukti Formal Deduktif — Bagian I (Arah Maju $\mathbb{S}^2 \to \mathbb{R}^2$):**

1. Setiap lingkaran $C \subset \mathbb{S}^2$ adalah irisan $\mathbb{S}^2$ dengan suatu bidang iris $E: ax + by + cz + d = 0$ dengan $a^2+b^2+c^2 > 0$ dan jarak ke titik asal $\frac{|d|}{\sqrt{a^2+b^2+c^2}} < 1$, yakni $a^2+b^2+c^2-d^2 > 0$ <span class="just">(Justifikasi: Definisi Lingkaran pada $\mathbb{S}^2$)</span>.
2. Substitusikan formula $\Phi^{-1}(u,v)$ dari Proposisi 3.2 ke dalam persamaan bidang $E$:
   $$a\left(\frac{2u}{1+u^2+v^2}\right) + b\left(\frac{2v}{1+u^2+v^2}\right) + c\left(\frac{u^2+v^2-1}{1+u^2+v^2}\right) + d = 0,$$
   yang ekuivalen dengan $2au + 2bv + (c+d)(u^2+v^2) = c - d$ <span class="just">(Justifikasi: Proposisi 3.2 & Aljabar)</span>.
3. **Kasus 1 ($N = (0,0,1) \in C$):** Substitusi $(0,0,1)$ ke $E$ memberikan $c + d = 0$. Persamaan di Langkah 2 mereduksi menjadi persamaan linear $2au + 2bv = c - d$ (garis lurus di $\mathbb{R}^2$) <span class="just">(Justifikasi: Aturan Logika 11)</span>.
4. **Kasus 2 ($N \notin C$):** Maka $c + d \neq 0$. Dengan melengkapkan kuadrat sempurna diperoleh
   $$\left(u + \frac{a}{c+d}\right)^2 + \left(v + \frac{b}{c+d}\right)^2 = \frac{a^2+b^2+c^2-d^2}{(c+d)^2} > 0,$$
   yang merupakan persamaan lingkaran Euklides di $\mathbb{R}^2$ <span class="just">(Justifikasi: Langkah 1 & Definisi Lingkaran)</span>.

</div>

---

# Teorema 3.4: Bukti Arah Konvers & Geometri Sinar

<div class="grid grid-cols-12 gap-4 items-center">

<div class="col-span-6">

<div class="proof-box">

**Bukti Formal — Bagian II (Arah Konvers $\mathbb{R}^2 \to \mathbb{S}^2$):**

1. Ambil sebarang lingkaran atau garis lurus $\Gamma \subset \mathbb{R}^2$, lalu pilih **tiga titik berbeda** $q_1, q_2, q_3 \in \Gamma$ <span class="just">(Justifikasi: Hipotesis Konvers)</span>.
2. Misalkan $p_i = \Phi^{-1}(q_i) \in \mathbb{S}^2_*$ ($i = 1,2,3$) adalah prapetanya pada bola <span class="just">(Justifikasi: Bijektivitas $\Phi$)</span>.
3. Tiga titik berbeda $p_1, p_2, p_3 \in \mathbb{S}^2$ menentukan satu bidang iris tunggal $E \subset \mathbb{R}^3$, sehingga terdapat lingkaran tunggal $C = \mathbb{S}^2 \cap E$ yang melalui $p_1, p_2, p_3$ <span class="just">(Justifikasi: Aksioma Insidensi Ruang $\mathbb{R}^3$)</span>.
4. Berdasarkan Bagian I, bayangan $\Gamma' = \Phi(C)$ adalah suatu lingkaran atau garis lurus di $\mathbb{R}^2$ yang memuat $q_1, q_2, q_3$ <span class="just">(Justifikasi: Bagian I Teorema 3.4)</span>.
5. Karena di $\mathbb{R}^2$ tiga titik berbeda menentukan tepat satu lingkaran atau garis lurus, maka $\Gamma = \Gamma' = \Phi(C)$, sehingga $\Phi^{-1}(\Gamma) = C$ adalah lingkaran pada $\mathbb{S}^2$ <span class="just">(Justifikasi: Ketunggalan Lingkaran/Garis melalui 3 Titik)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-6">

<JxgCircleToCircline height="300px" />

</div>

</div>
