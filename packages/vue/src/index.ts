import type { App } from 'vue'
import ImaginaIcon from './ImaginaIcon.vue'
import { useIcon } from './useIcon.js'

export const ImaginaIconsPlugin = {
    install(app: App) {
        app.component('ImaginaIcon', ImaginaIcon)
    },
}

export { ImaginaIcon, useIcon }
export type { IconName, IconVariant } from '@imagina-icons/core'
export default ImaginaIconsPlugin