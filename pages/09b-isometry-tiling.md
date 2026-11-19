# Klasifikasi $\operatorname{Iso}^+(\mathbb{H}^2)$: Dua Inversi, Tiga Jenis

<div class="def-box">

Menurut Teorema 4.20 & Akibat 4.21, isometri yang **mengawetkan orientasi** adalah komposisi **dua** inversi $\phi = I_M \circ I_L$. Jenisnya ditentukan oleh **cara $L$ dan $M$ bertemu**; dalam bentuk $\phi(z) = \dfrac{az+b}{cz+d}$ dengan $ad-bc = 1$, jejak $|a+d|$ membedakannya.

</div>

<div class="ma-table text-[0.78rem]">

| $L$ dan $M$ | Jenis $\phi = I_M \circ I_L$ | Bentuk kanonik | $\lvert\mathrm{tr}\rvert$ | Orbit titik |
| --- | --- | --- | :-: | --- |
| **berpotongan** di $p_0$, sudut $\theta/2$ | **rotasi** (eliptik) sejauh $\theta$ | $z \mapsto \dfrac{z\cos\frac\theta2 + \sin\frac\theta2}{-z\sin\frac\theta2 + \cos\frac\theta2}$ (pusat $i$) | $< 2$ | lingkaran hiperbolik |
| **sejajar**: bertemu hanya di titik ideal $\xi$ | **pergeseran paralel** (parabolik) | $z \mapsto z + s$ ($\xi = \infty$) | $= 2$ | horosiklus di $\xi$ |
| **ultraparalel**: ada garis $\perp$ keduanya | **translasi** (hiperbolik) sejauh $\ell$ | $z \mapsto e^{\ell} z$ (sumbu $x = 0$) | $> 2$ | kurva ekuidistan |

</div>

<div v-click class="socratic-box">

<span class="socratic-title">Hubungan dengan Latihan 4.7–4.8:</span> $t_{(a,0)} = \bar r_{x=a/2} \circ \bar r_{x=0}$ adalah kasus **sejajar** ($\xi = \infty$), dan $d_r = I_{C_{0,\sqrt r}} \circ I_{C_{0,1}}$ adalah kasus **ultraparalel** (sumbu-$y$ tegak lurus kedua lingkaran). Kasus **berpotongan** melengkapi klasifikasi: $\operatorname{tr}^2 - 4 = (a-d)^2 + 4bc$ adalah diskriminan persamaan titik tetap $cz^2 + (d-a)z - b = 0$.

</div>

---

# Eksperimen 1: Rotasi & Pergeseran Paralel pada Ubin $\{4,5\}$

<div class="text-[0.82rem] mb-1">

Ubin $\{4,5\}$: persegi hiperbolik, **lima** di tiap titik sudut, dipecah menjadi segitiga $(2,4,5)$ dua warna. Seret $p_0$ (rotasi) atau $\xi$ (pergeseran paralel); tombol *pusat ubin / titik sudut / tengah sisi* memilih rotasi yang memetakan ubin ke dirinya sendiri.

</div>

<JxgIsometryTiling mode="rot" height="285px" />

---

# Eksperimen 2: Translasi & Inversi — Orientasi Terbalik

<div class="text-[0.82rem] mb-1">

*Sisi berhadapan*: $L, M$ = garis tengah ubin dasar dan ubin tetangganya, sehingga $\ell = 4a$ dengan $\cosh a = \cos(\pi/q)/\sin(\pi/p)$. Pada mode **inversi** warna segitiga **bertukar**: $I_L$ membalik orientasi (Akibat 4.21).

</div>

<JxgIsometryTiling mode="tra" height="285px" />

---

# Diskusi Sokratik & Latihan: Isometri dan Ubin $\{p,q\}$

<div class="socratic-box">

<span class="socratic-title">Diskusi Sokratik:</span> Pada mode *inversi* dengan cermin ubin, gambar ubin kembali ke dirinya sendiri tetapi **warnanya tertukar**, sedangkan rotasi & translasi simetri tidak menukar warna. Apa yang diukur oleh "warna" segitiga, dan mengapa $\det = -1$ harus menukarnya?

</div>

<div v-click class="latihan-box">

1. **Pewarnaan:** Buktikan bahwa segitiga $(2,p,q)$ dapat diwarnai dua warna (refleksi melintasi sisi menukar warna), tetapi persegi ubin $\{4,5\}$ tidak. *(Petunjuk: hitung ubin di sekitar titik sudut; $q = 5$ ganjil.)*
2. **Panjang translasi:** Untuk $\{4,5\}$ hitung $a$ dari $\cosh a = \cos(\pi/5)/\sin(\pi/4)$ dan verifikasi $\ell = 4a$ pada gambar Eksperimen 2.
3. **Dua cermin ubin:** Jika $L, M$ keduanya garis cermin ubin, tunjukkan bahwa $I_M \circ I_L$ memetakan ubin ke dirinya sendiri. Klasifikasikan $I_M \circ I_L$ untuk dua sisi **berhadapan** dan dua sisi **bersebelahan** dari satu persegi.
4. **Tanpa parabolik:** Mengapa tidak ada pergeseran paralel yang memetakan ubin $\{p,q\}$ ke dirinya sendiri? *(Petunjuk: titik tetap $\xi$ di tepi; luas setiap ubin berhingga.)*

</div>
