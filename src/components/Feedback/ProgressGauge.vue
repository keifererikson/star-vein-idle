<script setup lang="ts">
export interface ProgressGaugeProps {
  value: number
  max: number
}

defineProps<ProgressGaugeProps>()
</script>

<template>
  <progress
    class="progress w-full text-plasma-400"
    :value="value"
    :max="max > 0 ? max : 1"
  />
</template>
