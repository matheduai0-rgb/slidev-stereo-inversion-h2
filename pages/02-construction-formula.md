# Kuliah 3: Konstruksi Proyeksi Stereografis $\Phi$ (Lee 3.1)

<div class="grid grid-cols-12 gap-4 items-center">

<div class="col-span-6">

<div class="proof-box">

**Dilema Kartografi.** Berdasarkan Latihan 2.2 (dan *Theorema Egregium* Gauss), tidak ada pemetaan dari $\mathbb{S}^2$ ke $\mathbb{R}^2$ yang mengawetkan jarak sekaligus luas. Namun kita dapat mengawetkan **sudut** (*konformalitas*)!

</div>

<div v-click class="def-box">

**Definisi 3.1 (Proyeksi Stereografis — Lee).** Misalkan $N = (0,0,1) \in \mathbb{S}^2$ adalah **kutub utara**, dan $\mathbb{S}^2_* = \mathbb{S}^2 \setminus \{N\}$. Untuk setiap $p \in \mathbb{S}^2_*$, terdapat tepat satu titik $q = (u,v) \in \mathbb{R}^2$ sedemikian sehingga garis lurus di $\mathbb{R}^3$ dari $N$ menuju $(u,v,0)$ menembus $p$. Pemetaan

$$\Phi: \mathbb{S}^2_* \to \mathbb{R}^2, \quad \Phi(p) = q$$

disebut **proyeksi stereografis**.

</div>

</div>

<div class="col-span-6">

<JxgStereoPoint height="300px" />

</div>

</div>

---

# Proposisi 3.2: Formula Aljabar $\Phi$ dan $\Phi^{-1}$

<div class="thm-box">

**Proposisi 3.2 (Nam-Hoon Lee — Bentuk Kanonik $H \implies C$).** Untuk setiap $(x,y,z) \in \mathbb{S}^2_*$ dan setiap $(u,v) \in \mathbb{R}^2$, berlaku bijeksi eksplisit:

$$\Phi(x,y,z) = \left(\frac{x}{1-z}, \frac{y}{1-z}\right) \quad \text{dan} \quad \Phi^{-1}(u,v) = \left(\frac{2u}{u^2+v^2+1}, \frac{2v}{u^2+v^2+1}, \frac{u^2+v^2-1}{u^2+v^2+1}\right).$$

</div>

<div v-click class="proof-box">

**Bukti Formal Deduktif (Aturan Logika 1 Greenberg):**

1. Misalkan $(u,v) = \Phi(x,y,z)$. Garis lurus di $\mathbb{R}^3$ yang melalui $(u,v,0)$ dan $(x,y,z)$ adalah $\{t(x,y,z) + (1-t)(u,v,0) \mid t \in \mathbb{R}\}$ <span class="just">(Justifikasi: Definisi 3.1 & Persamaan Garis Parameter)</span>.
2. Karena garis ini melalui $N = (0,0,1)$, terdapat $t \in \mathbb{R}$ sehingga $(0,0,1) = (tx + (1-t)u,\ ty + (1-t)v,\ tz)$ <span class="just">(Justifikasi: Definisi Segaris)</span>.
3. Dari komponen ke-3 diperoleh $tz = 1 \implies t = 1/z$ (dan $1 - t = \frac{z-1}{z}$), sehingga substitusi ke komponen ke-1 dan ke-2 menghasilkan $u = \frac{x}{1-z}$ dan $v = \frac{y}{1-z}$ <span class="just">(Justifikasi: Aljabar Lapangan $\mathbb{R}$ karena $z \neq 1$)</span>.
4. Sebaliknya, substitusikan $(x,y,z) = \Phi^{-1}(u,v)$; berlaku $x^2+y^2+z^2 = 1$ dan $1 - z = \frac{2}{u^2+v^2+1}$, sehingga $\Phi(x,y,z) = (u,v)$ <span class="just">(Justifikasi: Verifikasi Invers Fungsi)</span>. <span class="qed">∎</span>

</div>

<div v-click class="def-box">

**Definisi 3.3 (Bidang Diperluas $\mathbb{R}^2_\infty$):** Definisikan $\mathbb{R}^2_\infty := \mathbb{R}^2 \cup \{\infty\}$ dan tetapkan $\Phi(N) = \infty$, $\Phi^{-1}(\infty) = N$. Maka $\Phi: \mathbb{S}^2 \to \mathbb{R}^2_\infty$ menjadi bijeksi global pada seluruh bola!

</div>
