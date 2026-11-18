# Pengayaan: Vektor Singgung Circline di $\mathbb{R}^2$

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="def-box">

**Definisi (Sudut Dua Kurva — Lee 3.1).** Jika kurva mulus $C_1, C_2$ berpotongan di $p$, maka $\angle_p(C_1, C_2)$ adalah sudut antara garis singgungnya di $p$, dihitung dari **vektor singgung** parametrisasi $\gamma_i(0) = p$ (Contoh 3.1–3.2):
$$\angle_p(C_1, C_2) = \cos^{-1}\frac{\gamma_1'(0)\cdot\gamma_2'(0)}{|\gamma_1'(0)|\,|\gamma_2'(0)|} \in [0, \pi];$$
jika $\gamma_i'(0) = (\cos\theta_i, \sin\theta_i)$ maka $\angle_p = \theta_2 - \theta_1$. Membalik arah $\gamma_2$ mengubah $\theta$ menjadi $\pi - \theta$ (garis singgung sama).

</div>

<div v-click class="thm-box">

**Proposisi T.1 (Singgung Circline).**

1. **Lingkaran $C_{q,r}$:** $\gamma(s) = q + r(\cos s, \sin s)$ memberi $\gamma'(s) = J(\gamma(s) - q)$, $J$ rotasi $90^\circ$: singgung **tegak lurus jari-jari** <span class="just">(Turunan)</span>.
2. **Garis $L: n \cdot u = k$:** $\gamma(s) = u_0 + s\,Jn$, singgungnya $Jn \perp n$ <span class="just">(Definisi Garis)</span>.
3. **Bentuk terpadu** $F(u) = A|u|^2 + B \cdot u + C = 0$ ($A = 0$: garis). Dari $F(\gamma(s)) \equiv 0$: $\nabla F(p) \cdot \gamma'(s_0) = 0$, $\nabla F(p) = 2Ap + B$. Jadi **$J\nabla F(p)$ singgung**; kita pakai $J\nabla F$ sebagai **arah** circline ($A > 0$: berlawanan jarum jam) <span class="just">(Aturan Rantai)</span>.

</div>

</div>

<div class="col-span-5">

<JxgPlaneAngle height="290px" mode="tangent" />

</div>

</div>

---

# Proposisi T.2: Sudut Dua Circline di $\mathbb{R}^2$

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="thm-box">

**Proposisi T.2.** Misalkan $p \in C_1 \cap C_2$, $\theta = \angle_p(C_1, C_2)$, dengan arah seperti T.1 (lingkaran berlawanan jarum jam, garis $n \cdot u = k$ berarah $Jn$, $|n| = 1$).

- **Dua lingkaran** $C_{q_1,r_1}, C_{q_2,r_2}$ dengan $d = |q_1 - q_2|$: $\;\cos\theta = \dfrac{r_1^2 + r_2^2 - d^2}{2r_1r_2}$.
- **Lingkaran & garis:** $\cos\theta = \dfrac{k - n \cdot q}{r}$ (jarak bertanda $q$ ke $L$ dibagi $r$). **Dua garis:** $\cos\theta = n_1 \cdot n_2$.
- Nilai $\theta$ **sama di kedua titik potong**, dan $C_1 \perp C_2 \iff d^2 = r_1^2 + r_2^2$.

</div>

<div v-click class="proof-box">

**Bukti (dua lingkaran).**

1. Vektor singgung di $p$ adalah $J(p-q_i)$, $|J(p - q_i)| = r_i$. Karena $J$ mengawetkan hasil kali dalam, $J(p-q_1)\cdot J(p-q_2) = (p-q_1)\cdot(p-q_2)$ <span class="just">(T.1, $J \in O(2)$)</span>.
2. Segitiga $q_1\,p\,q_2$ bersisi $r_1, r_2, d$; hukum kosinus: $(p - q_1)\cdot(p - q_2) = \tfrac12(r_1^2 + r_2^2 - d^2)$ <span class="just">(Ekspansi $|q_1 - q_2|^2$)</span>.
3. Bagi dengan $r_1r_2$ (Definisi Lee 3.1). Ruas kanan tidak memuat $p$, jadi $\theta$ sama di $p_1$ dan $p_2$; $\theta = \tfrac{\pi}{2} \iff r_1^2 + r_2^2 - d^2 = 0$ <span class="just">(Aljabar)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgPlaneAngle height="290px" mode="angle" />

</div>

</div>

---

# Proposisi T.3: Vektor Singgung Lingkaran pada $\mathbb{S}^2$

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="thm-box">

**Proposisi T.3.** Misalkan $\hat C = \mathbb{S}^2 \cap \{x : \hat n \cdot x = h\}$ dengan $|\hat n| = 1$, $|h| < 1$, dan $p \in \hat C$. Maka
$$t = \hat n \times p$$
adalah vektor singgung $\hat C$ di $p$; $t \perp p$ (jadi $t \in T_p\mathbb{S}^2$), $t \perp \hat n$ (jadi $t$ sejajar bidang $\hat C$), dan $|t|^2 = 1 - h^2$.

</div>

<div v-click class="proof-box">

**Bukti.**

1. Pilih basis ortonormal $e_1, e_2 = \hat n \times e_1$ dari $\hat n^{\perp}$. Pusat $\hat C$ adalah $h\hat n$ dan jari-jarinya $\sqrt{1-h^2}$, jadi $p(s) = h\hat n + \sqrt{1-h^2}\,(\cos s\, e_1 + \sin s\, e_2)$ <span class="just">(Pythagoras)</span>.
2. Karena $\hat n \times e_1 = e_2$, $\hat n \times e_2 = -e_1$, $\hat n \times \hat n = 0$: $\;p'(s) = \sqrt{1-h^2}(-\sin s\, e_1 + \cos s\, e_2) = \hat n \times p(s)$ <span class="just">(Turunan & Hasil Kali Silang)</span>.
3. $\hat n \times p$ tegak lurus $\hat n$ dan $p$; dan $|\hat n \times p|^2 = |\hat n|^2|p|^2 - (\hat n \cdot p)^2 = 1 - h^2$ <span class="just">(Identitas Lagrange)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgSphereAngle height="300px" mode="tangent" />

</div>

</div>

---

# Proposisi T.4: Sudut Dua Lingkaran pada $\mathbb{S}^2$

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="thm-box">

**Proposisi T.4.** Jika $\hat C_i = \mathbb{S}^2 \cap \{\hat n_i \cdot x = h_i\}$ ($i = 1,2$) berpotongan di $p$ dan berarah $t_i = \hat n_i \times p$ (T.3), maka $\theta = \angle_p(\hat C_1, \hat C_2)$ memenuhi
$$\cos\theta = \frac{\hat n_1 \cdot \hat n_2 - h_1h_2}{\sqrt{(1-h_1^2)(1-h_2^2)}}.$$
Nilai ini sama di kedua titik potong. Khususnya: lingkaran besar ($h_i = 0$) memberi $\cos\theta = \hat n_1 \cdot \hat n_2$, dan $\hat C_1 \perp \hat C_2 \iff \hat n_1 \cdot \hat n_2 = h_1h_2$.

</div>

<div v-click class="proof-box">

**Bukti.**

1. Singgung di $p$ adalah $t_i = \hat n_i \times p$ dengan $|t_i| = \sqrt{1 - h_i^2}$ <span class="just">(Proposisi T.3)</span>.
2. Identitas Lagrange $(a \times b)\cdot(c \times d) = (a\cdot c)(b \cdot d) - (a \cdot d)(b \cdot c)$ dengan $p \cdot p = 1$, $\hat n_i \cdot p = h_i$:
   $$t_1 \cdot t_2 = (\hat n_1 \cdot \hat n_2)(p \cdot p) - (\hat n_1 \cdot p)(p \cdot \hat n_2) = \hat n_1 \cdot \hat n_2 - h_1 h_2$$
   <span class="just">(Aljabar Vektor $\mathbb{R}^3$)</span>.
3. Bagi dengan $|t_1||t_2|$; ruas kanan tidak memuat $p$ <span class="just">(Definisi Sudut Lee 3.1)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgSphereAngle height="300px" mode="angle" />

</div>

</div>

---

# Teorema T.5: Diferensial $d\Phi$ & Faktor Konformal (Bukti Analitik Teorema 3.5)

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="thm-box">

**Teorema T.5.** Untuk $p = (x,y,z) \in \mathbb{S}^2_*$ dan $v \in T_p\mathbb{S}^2$ (yakni $p \cdot v = 0$):
$$d\Phi_p(v) = \frac{(1-z)\,(v_x, v_y) + v_z\,(x, y)}{(1-z)^2}, \qquad |d\Phi_p(v)| = \frac{|v|}{1-z}.$$
Jadi $d\Phi_p$ adalah **kelipatan skalar suatu isometri linear**, sehingga $\Phi$ mengawetkan sudut.

</div>

<div v-click class="proof-box">

**Bukti.**

1. Turunkan $\Phi = \frac{(x,y)}{1-z}$ sepanjang kurva dengan kecepatan $v$: diperoleh rumus $d\Phi_p(v)$ di atas <span class="just">(Aturan Hasil Bagi)</span>.
2. Dari $p \cdot v = 0$: $(x,y)\cdot(v_x,v_y) = -z v_z$; dari $|p| = 1$: $x^2 + y^2 = 1 - z^2$ <span class="just">(Hipotesis)</span>.
3. $(1-z)^4|d\Phi_p v|^2 = (1-z)^2(v_x^2+v_y^2) - 2z(1-z)v_z^2 + (1-z^2)v_z^2 = (1-z)^2|v|^2$ <span class="just">(Aljabar)</span>.
4. Polarisasi: $d\Phi_p(v)\cdot d\Phi_p(w) = \frac{v \cdot w}{(1-z)^2}$, sehingga $\cos\angle(d\Phi v, d\Phi w) = \cos\angle(v,w)$ <span class="just">(Identitas Polarisasi)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgSphereAngle height="300px" mode="project" />

</div>

</div>

---

# Jembatan Aljabar: Rumus Sudut Bertahan di Bawah $\Phi$

<div class="thm-box">

**Proposisi T.6.** Bidang $E: ax + by + cz + d = 0$ memotong $\mathbb{S}^2$ pada $\hat C$, dan $\Phi(\hat C)$ adalah circline $A|u|^2 + B\cdot u + C = 0$ dengan
$$A = c + d, \qquad B = 2(a, b), \qquad C = d - c \qquad \text{(Teorema 3.4, Langkah 2)}.$$
Dengan arah $J\nabla F_i$ (T.1), sudut circline di $\mathbb{R}^2$ memenuhi $\;\cos\theta = \dfrac{B_1 \cdot B_2 - 2(A_1C_2 + A_2C_1)}{\sqrt{(|B_1|^2 - 4A_1C_1)(|B_2|^2 - 4A_2C_2)}}$, dan rumus ini **sama persis** dengan rumus bola (T.4).

</div>

<div v-click class="proof-box">

**Bukti.** Tulis $\mathbf{n}_i = (a_i, b_i, c_i)$.

0. Di $p$ dengan $F_i(p) = 0$: $\nabla F_1 \cdot \nabla F_2 = B_1 \cdot B_2 - 2(A_1C_2 + A_2C_1)$ dan $|\nabla F_i|^2 = |B_i|^2 - 4A_iC_i$; $J$ mengawetkan hasil kali dalam <span class="just">(T.1, substitusi $A_i|p|^2 = -B_i\cdot p - C_i$)</span>.
1. $|B|^2 - 4AC = 4(a^2 + b^2) - 4(d^2 - c^2) = 4(|\mathbf{n}|^2 - d^2)$ <span class="just">(Aljabar)</span>.
2. $B_1 \cdot B_2 - 2(A_1C_2 + A_2C_1) = 4(a_1a_2 + b_1b_2) - 2(2d_1d_2 - 2c_1c_2) = 4(\mathbf{n}_1 \cdot \mathbf{n}_2 - d_1d_2)$ <span class="just">(Ekspansi)</span>.
3. Dengan $\hat n_i = \mathbf{n}_i/|\mathbf{n}_i|$ dan $h_i = -d_i/|\mathbf{n}_i|$: $\;\cos\theta = \dfrac{\mathbf{n}_1 \cdot \mathbf{n}_2 - d_1d_2}{\sqrt{(|\mathbf{n}_1|^2 - d_1^2)(|\mathbf{n}_2|^2 - d_2^2)}} = \dfrac{\hat n_1 \cdot \hat n_2 - h_1h_2}{\sqrt{(1-h_1^2)(1-h_2^2)}}$ <span class="just">(T.4)</span>. <span class="qed">∎</span>

</div>

<div v-click class="socratic-box">

<span class="socratic-title">Catatan:</span> Ekspresi $\langle (\mathbf{n}_1, d_1), (\mathbf{n}_2, d_2)\rangle = \mathbf{n}_1 \cdot \mathbf{n}_2 - d_1d_2$ adalah bentuk bilinear bertanda $(+,+,+,-)$ pada $\mathbb{R}^4$: sudut circline = sudut "Lorentz" antara vektor koefisiennya. Mengganti $(a,b,c,d)$ dengan $-(a,b,c,d)$ (bidang sama) membalik arah, sehingga $\theta \mapsto \pi - \theta$. Bentuk sejenis ($O(2,1)$) akan muncul lagi pada model hiperboloid $\mathbb{H}^2$.

</div>

---

# Diskusi Sokratik & Latihan Pengayaan (Singgung & Sudut)

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Mengapa sudut dua lingkaran (di bidang maupun di bola) **tidak bergantung pada titik potong** yang dipilih? Simetri apa yang menukar $p_1$ dan $p_2$ sambil memfiksasi kedua lingkaran? Bandingkan dengan bukti geometris Teorema 3.5 (refleksi pada bidang bagi $pN$).

</div>

<div v-click class="latihan-box">

- **Latihan T.1:** Hitung sudut antara $\hat C_1 = \mathbb{S}^2 \cap \{z = \tfrac12\}$ dan $\hat C_2 = \mathbb{S}^2 \cap \{x = \tfrac12\}$ dengan T.4, lalu tentukan $\Phi(\hat C_1)$, $\Phi(\hat C_2)$ dan hitung sudutnya dengan T.2. *(Jawab: dengan arah $\hat n_i \times p$, $\cos\theta = -\tfrac13$, $\theta \approx 109{,}47^\circ$; $\Phi(\hat C_1) = C_{0,\sqrt3}$, $\Phi(\hat C_2) = C_{(2,0),\sqrt3}$. Dengan keduanya berlawanan jarum jam, T.2 memberi $\cos = \tfrac13 = \cos(\pi - \theta)$: mengapa? Petunjuk: tanda $A = c + d$.)*
- **Latihan T.2:** Tunjukkan bahwa setiap meridian tegak lurus setiap lingkaran lintang, baik di $\mathbb{S}^2$ (via T.4) maupun bayangannya di $\mathbb{R}^2$ (garis melalui $0$ dan lingkaran berpusat $0$).
- **Latihan T.3:** Untuk inversi $I_C$, $C = C_{q,r}$, tunjukkan $dI_C(p)(v) = \frac{r^2}{|p-q|^2}\, R_{p-q}(v)$, dengan $R_w$ refleksi linear terhadap garis $w^\perp$. Simpulkan bahwa $I_C$ mengawetkan sudut tetapi membalik orientasi.
- **Latihan T.4:** Buktikan: $\hat C_1 \perp \hat C_2$ di $\mathbb{S}^2 \iff \Phi(\hat C_1) \perp \Phi(\hat C_2)$, langsung dari kriteria $\hat n_1 \cdot \hat n_2 = h_1h_2$ dan $d^2 = r_1^2 + r_2^2$.

</div>
