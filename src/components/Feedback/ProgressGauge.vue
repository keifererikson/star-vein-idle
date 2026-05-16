<script setup lang="ts">
import { computed } from 'vue'

export interface ProgressGaugeProps {
  value: number
  max: number
}

const props = defineProps<ProgressGaugeProps>()

const progress = computed(() => {
  if (props.max <= 0) return 0
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})
</script>

<template>
  <div
    class="h-2 w-full overflow-hidden rounded-full border border-space-700 bg-space-900"
    role="progressbar"
    :aria-valuenow="Math.round(progress)"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      class="h-full rounded-full bg-gradient-to-r from-plasma-600 to-plasma-400 shadow-[0_0_8px_rgba(45,212,191,0.5)] transition-[width] duration-75"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
