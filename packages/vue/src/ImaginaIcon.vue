<template>
  <svg
      v-if="svgContent"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      :fill="variant === 'outline' ? 'none' : 'currentColor'"
      :stroke="variant === 'outline' ? color : 'none'"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="['mi-icon', `mi-icon--${variant}`, animationClass]"
      :style="cssVars"
      v-html="svgContent"
  />
  <span v-else>[icon not found: {{ name }}]</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { icons, type IconName, type IconVariant } from '@imagina-icons/core'

type AnimationType = 'none' | 'spin' | 'pulse' | 'bounce' | 'ping'

const props = withDefaults(defineProps<{
  name: IconName
  variant?: IconVariant
  size?: string | number
  color?: string
  secondaryColor?: string
  secondaryOpacity?: number
  strokeWidth?: string | number
  animation?: AnimationType
}>(),  {
  variant: 'outline' as IconVariant,
  size: '1em',
  color: 'currentColor',
  secondaryColor: 'currentColor',
  secondaryOpacity: 0.3,
  strokeWidth: 2,
  animation: 'none' as AnimationType,
})

const svgContent = computed(() =>
    icons[props.name]?.[props.variant] ?? null
)

// Clases de animación
const animationClass = computed(() =>
    props.animation !== 'none' ? `mi-${props.animation}` : ''
)

// CSS custom properties como estilo inline
const cssVars = computed(() => ({
  '--mi-size': typeof props.size === 'number' ? `${props.size}px` : props.size,
  '--mi-color': props.color,
  '--mi-secondary-color': props.secondaryColor,
  '--mi-secondary-opacity': props.secondaryOpacity,
  '--mi-stroke-width': props.strokeWidth,
}))
</script>

<style scoped>
.mi-icon { vertical-align: middle; transition: color 0.15s ease; }
.mi-spin  { animation: mi-spin   1s linear infinite; }
.mi-pulse { animation: mi-spin   1s steps(8) infinite; }
.mi-bounce{ animation: mi-bounce 1s ease infinite; }
.mi-ping  { animation: mi-ping   1.5s cubic-bezier(0,0,0.2,1) infinite; }

@keyframes mi-spin   { to { transform: rotate(360deg); } }
@keyframes mi-bounce { 0%,100%{transform:translateY(-15%)} 50%{transform:none} }
@keyframes mi-ping   { 75%,100%{transform:scale(1.5);opacity:0} }
</style>