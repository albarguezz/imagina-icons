import { computed, toValue, type MaybeRef } from 'vue'
import { icons, type IconName, type IconVariant } from '@imagina-icons/core'

export function useIcon(name: MaybeRef<IconName>, variant: MaybeRef<IconVariant> = 'outline') {
    const svgContent = computed(() =>
        icons[toValue(name)]?.[toValue(variant)] ?? null
    )
    const exists = computed(() => svgContent.value !== null)

    return { svgContent, exists }
}