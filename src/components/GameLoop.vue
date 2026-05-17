<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import { usePlayerStore } from '@/stores/usePlayerStore'

const TICK_INTERVAL_MS = 1000

const player = usePlayerStore()

let intervalId: ReturnType<typeof setInterval> | null = null

function onVisibilityChange() {
  if (document.visibilityState === 'visible') {
    player.catchUpFromLastActive()
  }
}

onMounted(() => {
  intervalId = setInterval(() => {
    player.tick(TICK_INTERVAL_MS)
  }, TICK_INTERVAL_MS)

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
