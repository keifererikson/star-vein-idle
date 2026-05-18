<script setup lang="ts">
import { useNotificationStore } from '@/stores/useNotificationStore'

const notificationStore = useNotificationStore()
</script>

<template>
  <div class="toast toast-center toast-bottom z-[100] pointer-events-none mb-4">
    <TransitionGroup name="toast" tag="div" class="flex flex-col gap-2 items-center">
      <div 
        v-for="toast in notificationStore.toasts" 
        :key="toast.id"
        class="alert shadow-lg py-2 px-4 rounded border font-mono text-xs text-slate-200 transition-colors pointer-events-auto"
        :class="{
          'border-emerald-500/50 bg-emerald-950/80 text-emerald-100': toast.type === 'success',
          'border-amber-500/50 bg-amber-950/80 text-amber-100': toast.type === 'warning',
          'border-red-500/50 bg-red-950/80 text-red-100': toast.type === 'error',
          'border-space-500/50 bg-space-800/90 text-slate-200': toast.type === 'info'
        }"
      >
        <span>{{ toast.text }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
