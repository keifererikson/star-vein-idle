<script setup lang="ts">
export interface TerminalBoxProps {
  title?: string
  subtitle?: string
}

defineProps<TerminalBoxProps>()
</script>

<template>
  <section
    class="rounded-lg border border-space-700/80 bg-space-800/50 p-4 shadow-[inset_0_1px_0_rgba(148,163,184,0.06)]"
  >
    <header v-if="title || subtitle" class="mb-4 border-b border-space-700/60 pb-3">
      <h2
        v-if="title"
        class="font-mono text-lg font-semibold tracking-wide text-plasma-400"
      >
        {{ title }}
      </h2>
      <p v-if="subtitle" class="mt-1 text-sm text-slate-400">
        {{ subtitle }}
      </p>
    </header>
    <slot />
  </section>
</template>
