<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import { usePlayerStore } from '@/stores/usePlayerStore'

/** UI refresh rate; simulation uses wall-clock elapsed time in tick(). */
const TICK_INTERVAL_MS = 100

const player = usePlayerStore()

let intervalId: ReturnType<typeof setInterval> | null = null

function runTick() {
  if (document.visibilityState === 'hidden') return
  player.tick()
}

function onVisibilityChange() {
  if (document.visibilityState === 'visible') {
    player.catchUpFromLastActive()
  }
}

onMounted(() => {
  intervalId = setInterval(runTick, TICK_INTERVAL_MS)
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <span class="sr-only" aria-hidden="true">Game loop</span>
</template>
