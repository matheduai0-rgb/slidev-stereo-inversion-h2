<script setup lang="ts">
// Clickable slide number shown on every slide (except the title slide and print/export).
// Click the number → it becomes an input: type a slide number + Enter to jump (Esc cancels).
// ‹ › step one slide. Uses only the public useNav() API.
import { computed, nextTick, ref } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total, prevSlide, nextSlide, go, isPrintMode } = useNav()
const visible = computed(() => !isPrintMode.value && currentPage.value > 1)

const editing = ref(false)
const draft = ref('')
const input = ref<HTMLInputElement | null>(null)

async function startEdit() {
  draft.value = String(currentPage.value)
  editing.value = true
  await nextTick()
  input.value?.focus()
  input.value?.select()
}
function commit() {
  const n = Number.parseInt(draft.value, 10)
  editing.value = false
  if (Number.isFinite(n) && n >= 1 && n <= total.value && n !== currentPage.value) go(n)
}
function cancel() {
  editing.value = false
}
</script>

<template>
  <nav v-if="visible" class="page-pill" :class="{ editing }" aria-label="Navigasi slide" @keydown.stop>
    <button class="pp-step" :disabled="currentPage <= 1" title="Slide sebelumnya" @click="prevSlide()">‹</button>
    <input
      v-if="editing"
      ref="input"
      v-model="draft"
      class="pp-input"
      type="number"
      min="1"
      :max="total"
      aria-label="Nomor slide"
      @keydown.enter.prevent="commit"
      @keydown.esc.prevent="cancel"
      @blur="cancel"
    >
    <button v-else class="pp-no" title="Klik untuk lompat ke slide…" @click="startEdit">
      {{ currentPage }}<span class="pp-sep">/</span>{{ total }}
    </button>
    <span v-if="editing" class="pp-total">/ {{ total }}</span>
    <button class="pp-step" :disabled="currentPage >= total" title="Slide berikutnya" @click="nextSlide()">›</button>
  </nav>
</template>

<style scoped>
.page-pill {
  position: absolute;
  right: 10px;
  bottom: 7px;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 1px;
  padding: 1px 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(21, 101, 192, 0.22);
  font: 600 0.68rem/1.2 "Liberation Sans", "Noto Sans", system-ui, sans-serif;
  color: #1565c0;
  user-select: none;
  opacity: 0.75;
  transition: opacity 0.15s;
}
.page-pill:hover,
.page-pill.editing { opacity: 1; }
.page-pill button {
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
  border-radius: 999px;
  padding: 1px 5px;
}
.page-pill button:hover:not(:disabled) { background: rgba(21, 101, 192, 0.12); }
.page-pill button:disabled { opacity: 0.3; cursor: default; }
.pp-no { font-variant-numeric: tabular-nums; min-width: 3.4em; }
.pp-sep { margin: 0 2px; opacity: 0.55; font-weight: 400; }
.pp-step { font-size: 0.85rem; line-height: 1; }
.pp-input {
  width: 2.6em;
  font: inherit;
  color: inherit;
  text-align: right;
  border: 1px solid rgba(21, 101, 192, 0.45);
  border-radius: 4px;
  padding: 0 2px;
  background: #fff;
  outline: none;
  -moz-appearance: textfield;
}
.pp-input::-webkit-outer-spin-button,
.pp-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.pp-total { opacity: 0.6; font-weight: 400; padding: 0 3px 0 2px; font-variant-numeric: tabular-nums; }
</style>
