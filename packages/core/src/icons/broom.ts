import type { IconDefinition } from "../types.js";

export const broom: IconDefinition = {
  outline: `
    <path d="M3 21l10-10"/>
    <path d="M12.5 11.5l-3-3 5.5-5.5 3 3"/>
    <path d="M9.5 14.5l-3-3 1.5-1.5 3 3"/>
    <path d="M16 6l2-2 2 2-2 2-2-2z"/>
    <path d="M3 21c0-3 1.5-5 4-6l2 2c-1 2-1.5 3-6 4z"/>
  `,
  solid: `
    <path fill="currentColor" stroke="none" d="M16.5 3.5a2 2 0 0 1 2.83 0l1.17 1.17a2 2 0 0 1 0 2.83l-5.5 5.5-4-4 5.5-5.5z"/>
    <path fill="currentColor" stroke="none" d="M3 21c0-3 1.5-5 4-6l5 5c-1 2.5-3 4-6 4H3v-3z"/>
    <path fill="currentColor" stroke="none" d="M7.5 10.5l4 4-2 2-4-4 2-2z"/>
  `,
  duotone: `
    <path fill="var(--mi-sc)" fill-opacity="var(--mi-so)" stroke="none" d="M3 21c0-3 1.5-5 4-6l5 5c-1 2.5-3 4-6 4H3v-3z"/>
    <path fill="currentColor" stroke="none" d="M16.5 3.5a2 2 0 0 1 2.83 0l1.17 1.17a2 2 0 0 1 0 2.83l-5.5 5.5-4-4 5.5-5.5z"/>
    <path d="M7.5 10.5l4 4-2 2-4-4 2-2z"/>
  `
}