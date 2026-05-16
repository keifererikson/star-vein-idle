<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'

export type SciFiButtonVariant = 'primary' | 'ghost' | 'danger' | 'nav'
export type SciFiButtonSize = 'sm' | 'md' | 'lg'

export interface SciFiButtonProps {
  variant?: SciFiButtonVariant
  size?: SciFiButtonSize
  label: string
  icon?: Component
  active?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
}

export interface SciFiButtonEmits {
  click: [event: MouseEvent]
}

const props = withDefaults(defineProps<SciFiButtonProps>(), {
  variant: 'primary',
  size: 'md',
  active: false,
  disabled: false,
  type: 'button',
  block: false,
})

const emit = defineEmits<SciFiButtonEmits>()

const buttonClass = computed(() => {
  const base =
    'btn inline-flex items-center gap-2 font-mono uppercase tracking-wider border transition-all duration-200'

  const sizes: Record<SciFiButtonSize, string> = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  }

  const variants: Record<SciFiButtonVariant, string> = {
    primary:
      'border-plasma-500/50 bg-plasma-600/20 text-plasma-400 hover:bg-plasma-500/30 hover:border-plasma-400 shadow-[0_0_12px_rgba(45,212,191,0.15)]',
    ghost:
      'border-space-700 bg-space-800/60 text-slate-300 hover:border-plasma-500/40 hover:text-plasma-400',
    danger:
      'border-error/40 bg-error/10 text-error hover:bg-error/20 hover:border-error',
    nav: props.active
      ? 'border-plasma-500/60 bg-plasma-500/15 text-plasma-400 shadow-[0_0_16px_rgba(45,212,191,0.2)]'
      : 'border-transparent bg-transparent text-slate-400 hover:bg-space-800 hover:text-plasma-400',
  }

  return [
    base,
    sizes[props.size],
    variants[props.variant],
    props.block ? 'w-full justify-start' : '',
  ].join(' ')
})

function onClick(event: MouseEvent) {
  if (props.disabled) return
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClass"
    :disabled="disabled"
    :aria-pressed="variant === 'nav' ? active : undefined"
    @click="onClick"
  >
    <component
      :is="icon"
      v-if="icon"
      class="size-4 shrink-0"
      aria-hidden="true"
    />
    <span>{{ label }}</span>
  </button>
</template>
