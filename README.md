# MA3042 Geometri — Proyeksi Stereografis, Inversi, & Geometri Hiperbolik $\mathbb{H}^2$

> **Kuliah 3–10 (Minggu 2–5) dalam satu dek:** dari $\mathbb{S}^2$ lewat $\Phi$ ke $\mathbb{R}^2_\infty$, inversi $I_C$ sebagai isometri $\mathbb{H}^2$, hingga Teorema Tiga Inversi (Teorema 4.20, Nam-Hoon Lee).  
> Slide kuliah interaktif berbasis [Slidev](https://sli.dev/) dan [JSXGraph](https://jsxgraph.uni-bayreuth.de/).

---

## 📚 Struktur (62 slide)

| Bagian | Kuliah | Isi (Lee) | Halaman |
| --- | --- | --- | --- |
| I | 3 | Proyeksi stereografis, circline, vektor singgung & sudut, konformalitas (3.1) | `d1-stereo`, `02`–`04` |
| II | 4 | Peta terinduksi, inversi $I_C$, ketunggalan, induksi refleksi bola (3.2) — Langkah 1 | `d2-inversion`, `05`–`07` |
| III | 5–6 | $l_{\mathbb{H}^2}$, isometri, lintasan terpendek, $d_{\mathbb{H}^2}$ (4.1–4.2 bag. 1) — Langkah 2–6 | `d3-poincare`, `h-02`–`h-04` |
| IV | 7–8 | Garis hiperbolik $H_{p_1,p_2}$, Prop. 4.14, Lemma 4.15 (IVT), Teorema 4.16 — Langkah 7–9 | `d4-hlines`, `08` |
| V | 9–10 | Lemma 4.17–4.18, Teorema 4.19–4.20, Akibat 4.21, sintesis 12 langkah — Langkah 10–12; klasifikasi $\operatorname{Iso}^+(\mathbb{H}^2)$ pada ubin $\{4,5\}$ | `d5-three`, `09`, `09b` |

Bagian I–III berasal dari dek `slidev-week2-stereographic` dan `slidev-week3-poincare`; Bagian IV–V dikonversi dari `Lecture_Lee_Week4_…typ` dan `Lecture_Lee_Week5_…typ`.

## 🧩 Komponen Interaktif Baru (`components/`)

| Komponen | Slide | Isi |
| --- | --- | --- |
| `JxgEquidistant` | Definisi 4.13 | $H_{p_1,p_2}$: $y_2\lvert q-p_1\rvert^2 = y_1\lvert q-p_2\rvert^2$, $d_{\mathbb{H}^2}(q,p_1) = d_{\mathbb{H}^2}(q,p_2)$, $\perp \gamma_{12}$ |
| `JxgCanonicalRAA` | Prop. 4.14 (RAA) | $p'$, $q'$ dan ketaksamaan segitiga ketat |
| `JxgSymmetryIVT` | Lemma 4.15 | $f(\alpha)$ pada $[q_1,q_2]$, akar $\alpha_0$ (IVT), translasi ke $(\mp a, b)$ |
| `JxgSwap` | Lemma 4.17 | $I_{H}(p_1) = p_2$, $I_H$ isometri & involusi |
| `JxgThreeInversions` | Teorema 4.20 | algoritma Lee: $\psi_3 = I_3 I_2 I_1 \phi = \mathrm{id}$; 0/1/2/3 inversi |
| `JxgIsometryTiling` | Klasifikasi (09b) | $\phi = I_M \circ I_L$ rotasi / pergeseran paralel / translasi & inversi pada ubin $\{p,q\}$ (segitiga $(2,p,q)$ dua warna); snap simetri, $\lvert\mathrm{tr}\rvert$ |

Komponen Bagian I–III sama dengan dek Minggu 2 dan 3. Geometri: `lib/geom.ts` (bola, circline, sudut), `lib/hyp.ts` ($\mathbb{H}^2$, bisektor, inversi garis hiperbolik, Möbius), `lib/jxg.ts` (gaya GeoGebra).
JSXGraph dipatok ke `1.10.1`; `vite.config.ts` memaksa pre-bundling JSXGraph agar `npm run dev` tidak blank.

---

## 🚀 Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

## 🛠️ Build untuk Produksi

```bash
npm run build
```
Hasil build statis tersimpan di direktori `dist/`.
