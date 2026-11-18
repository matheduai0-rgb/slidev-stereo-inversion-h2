# Kuliah 4: Peta Terinduksi & Inversi Lingkaran Satuan (Lee 3.2)

<div class="def-box">

**Definisi 3.6 (Pemetaan Terinduksi — Lee).** Diberikan pemetaan $g: \mathbb{S}^2 \to \mathbb{S}^2$ dan $f: \mathbb{R}^2_\infty \to \mathbb{R}^2_\infty$ yang dihubungkan oleh diagram komutatif:

$$f = \Phi \circ g \circ \Phi^{-1} \quad \iff \quad g = \Phi^{-1} \circ f \circ \Phi.$$

Maka $f$ disebut **pemetaan yang diinduksi oleh $g$** (dan $g$ diinduksi oleh $f$).

</div>

<div v-click class="thm-box">

**Proposisi 3.7 (Inversi Standar Diinduksi oleh Refleksi Ekuator — Lee).**

- **Hipotesis $H$:** $\bar{r}_G(x,y,z) = (x,y,-z)$ adalah refleksi bola $\mathbb{S}^2$ terhadap ekuator $G = \mathbb{S}^2 \cap \{z = 0\}$.
- **Kesimpulan $C$:** Pemetaan terinduksi $I = \Phi \circ \bar{r}_G \circ \Phi^{-1}: \mathbb{R}^2_\infty \to \mathbb{R}^2_\infty$ diberikan oleh
  $$I(u,v) = \frac{1}{u^2+v^2}(u,v) \quad \text{untuk } (u,v) \neq (0,0), \quad I(0) = \infty, \quad I(\infty) = 0.$$

</div>

---

# Proposisi 3.7: Bukti & Geometri Refleksi Ekuator

<div class="grid grid-cols-12 gap-4 items-start">

<div class="col-span-7">

<div class="proof-box">

**Bukti Formal Deduktif (Aturan Logika 1 Greenberg):**

1. Untuk $(u,v) \neq (0,0)$, Proposisi 3.2 memberikan $\Phi^{-1}(u,v) = \left(\frac{2u}{u^2+v^2+1}, \frac{2v}{u^2+v^2+1}, \frac{u^2+v^2-1}{u^2+v^2+1}\right)$ <span class="just">(Proposisi 3.2)</span>.
2. Terapkan $\bar{r}_G$: $(x',y',z') = \left(\frac{2u}{u^2+v^2+1}, \frac{2v}{u^2+v^2+1}, -\frac{u^2+v^2-1}{u^2+v^2+1}\right)$ <span class="just">(Definisi $\bar{r}_G$)</span>.
3. Karena $1 - z' = \frac{2(u^2+v^2)}{u^2+v^2+1}$, proyeksi $\Phi(x',y',z')$ menghasilkan $I(u,v) = \frac{1}{u^2+v^2}(u,v)$ <span class="just">(Proposisi 3.2 & Penyederhanaan Aljabar)</span>. <span class="qed">∎</span>

</div>

</div>

<div class="col-span-5">

<JxgEquatorInversion height="310px" />

</div>

</div>
