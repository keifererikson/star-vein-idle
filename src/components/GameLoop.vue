<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import { usePlayerStore } from '@/stores/usePlayerStore'

const MAX_DELTA_MS = 1000

const player = usePlayerStore()

let requestId: number | null = null
let previousTime: number | null = null

function loop(timestamp: number) {
  if (document.visibilityState !== 'hidden') {
    if (previousTime !== null) {
      const deltaMs = Math.min(timestamp - previousTime, MAX_DELTA_MS)
      if (deltaMs > 0) {
        player.tick(deltaMs)
      }
    }
    previousTime = timestamp
  }

  requestId = requestAnimationFrame(loop)
}

function onVisibilityChange() {
  if (document.visibilityState === 'visible') {
    previousTime = null
    player.catchUpFromLastActive()
  }
}

onMounted(() => {
  requestId = requestAnimationFrame(loop)
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  if (requestId !== null) {
    cancelAnimationFrame(requestId)
    requestId = null
  }
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <span class="sr-only" aria-hidden="true">Game loop</span>
</template>
