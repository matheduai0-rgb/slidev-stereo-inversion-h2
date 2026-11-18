# Teorema 3.5: Proyeksi Stereografis Mengawetkan Sudut

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="def-box">

**Definisi (Preservasi Sudut — Lee 3.1).** Sudut perpotongan dua kurva mulus $\angle_p(C_1, C_2)$ adalah sudut antara garis singgungnya di $p$. Peta $f$ **mengawetkan sudut** jika $\angle_{f(p)}(f(C_1), f(C_2)) = \angle_p(C_1, C_2)$.

</div>

<div class="thm-box">

**Teorema 3.5 (Konformalitas $\Phi$ — Bukti Geometris Lee).**

<v-clicks>

1. Ambil $p \in \mathbb{S}^2_*$ dan dua vektor singgung $t_1, t_2$ di $p$ bersudut $\theta$. Konstruksi dua lingkaran $C_1 = \mathbb{S}^2 \cap P_1$ dan $C_2 = \mathbb{S}^2 \cap P_2$ yang **melalui $p$ dan kutub utara $N$** bersinggungan dengan $t_1, t_2$ <span class="just">(Konstruksi Bidang $P_i$)</span>.
2. Oleh simetri cermin bola terhadap bidang bagi tegak lurus tali busur $pN$, sudut potong $C_1, C_2$ di $N$ sama dengan di $p$: $\angle_N(C_1, C_2) = \angle_p(C_1, C_2) = \theta$ <span class="just">(Simetri Lingkaran pada $\mathbb{S}^2$)</span>.
3. Karena $N \in C_1, C_2$, bayangannya adalah garis lurus $L_1 = \Phi(C_1) = P_1 \cap P_{xy}$ dan $L_2 = \Phi(C_2) = P_2 \cap P_{xy}$ <span class="just">(Teorema 3.4)</span>.
4. Tinjau bidang singgung kutub utara $P' = \{z = 1\}$. Garis singgung $C_i$ di $N$ adalah $L'_i = P_i \cap P'$ ($i = 1,2$) dengan $\angle_N(L'_1, L'_2) = \angle_N(C_1, C_2) = \theta$ <span class="just">(Definisi Garis Singgung)</span>.
5. Karena bidang $P' = \{z = 1\}$ **sejajar** dengan $P_{xy} = \{z = 0\}$, maka $L'_1 \parallel L_1$ dan $L'_2 \parallel L_2$, sehingga $\angle_{\Phi(p)}(L_1, L_2) = \angle_N(L'_1, L'_2) = \theta = \angle_p(C_1, C_2)$ <span class="just">(Kesejajaran Bidang Irisan)</span>. <span class="qed">∎</span>

</v-clicks>

</div>

</div>

<div class="col-span-5">

<JxgConformalityProof height="320px" :step="$clicks" />

</div>

</div>

---

# Diskusi Sokratik & Latihan Kuliah 3 (Lee Subbab 3.1)

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Lingkaran mana pada $\mathbb{S}^2$ yang dipetakan menjadi garis lurus di $\mathbb{R}^2$, dan mana yang tetap menjadi lingkaran Euklides? Karena $\Phi$ gagal mengawetkan jarak (Latihan 3.1), mengapa pelestarian sudut (**konformalitas**) menjadi invarian geometris kita yang paling ampuh?

</div>

<div v-click class="latihan-box">

- **Latihan 3.1 (Lee):** Buktikan bahwa proyeksi stereografis $\Phi$ **tidak mengawetkan jarak**, yakni terdapat $p_1, p_2 \in \mathbb{S}^2_*$ sehingga $d_{\mathbb{S}^2}(p_1, p_2) \neq d(\Phi(p_1), \Phi(p_2))$.
- **Latihan 3.3 (Lee — Puncak Kerucut Singgung):** Misalkan $C \subset \mathbb{S}^2$ adalah lingkaran kecil yang tidak melalui $N$, dan misalkan $q \in \mathbb{R}^3$ adalah titik puncak (*apex*) dari kerucut di $\mathbb{R}^3$ yang menyinggung $\mathbb{S}^2$ sepanjang $C$. Buktikan bahwa $\Phi(q)$ adalah **titik pusat Euklides** dari lingkaran $\Phi(C)$ di $\mathbb{R}^2$!
- **Latihan 3.4 (Lee):** Tentukan apakah masing-masing pemetaan berikut mengawetkan sudut: (a) $\phi(x,y) = (x, 2y)$ (regangan vertikal), (b) $\phi(x,y) = (2x, 2y)$ (dilatasi seragam $d_2$).
- **Latihan 3.5 (Lee):** Buktikan bahwa peta kuadrat kompleks $\phi(x,y) = (x^2 - y^2, 2xy)$ mengawetkan sudut pada $\mathbb{R}^2 \setminus \{(0,0)\}$.

</div>
