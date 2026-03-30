# Imagina Icons

Librería de iconos SVG de uso interno para los proyectos de **Imagina Ingenio**. Diseñada para integrarse de forma nativa en Vue 3, con soporte para HTML puro y cualquier framework a futuro.

Cada icono está disponible en tres variantes — `outline`, `solid` y `duotone` — y puede controlarse completamente mediante CSS custom properties o props de componente.

---

## Contenido del monorepo

```
imagina-icons/
├── packages/
│   ├── core/          # SVGs, tipos TypeScript y CSS generado
│   └── vue/           # Componente, plugin y composable para Vue 3
├── package.json       # Raíz del workspace
├── CHANGELOG.md
└── LICENSE
```

| Paquete | Descripción |
|---|---|
| `@imagina-icons/core` | Fuente de verdad. Exporta los iconos como objetos TypeScript y genera el CSS. |
| `@imagina-icons/vue` | Wrapper para Vue 3. Componente `<mi-icon>`, plugin y composable `useIcon()`. |

---

## Requisitos

- Node.js 18+
- npm 8+ (workspaces)

---

## Instalación en un proyecto

### Desde el GitLab Package Registry (recomendado)

Crea un archivo `.npmrc` en la raíz del proyecto donde vayas a instalar la librería:

```
@imagina-icons:registry=https://git.imaginadesarrollo.es/api/v4/projects/{PROJECT_ID}/packages/npm/
//git.imaginadesarrollo.es/api/v4/projects/{PROJECT_ID}/packages/npm/:_authToken=TU_TOKEN
```

Luego instala los paquetes:

```bash
npm install @imagina-icons/core @imagina-icons/vue
```

### Desde ruta local (desarrollo)

```bash
npm install ../imagina-icons/packages/core
npm install ../imagina-icons/packages/vue
```

---

## Uso en Vue 3

### 1. Registrar el plugin en `main.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { MyIconsPlugin } from '@imagina-icons/vue'
import '@imagina-icons/core/css'

createApp(App).use(MyIconsPlugin).mount('#app')
```

### 2. Usar en cualquier componente

**Clase CSS** — la forma más ligera:

```html
<!-- outline (default) -->
<span class="mi-home"></span>

<!-- solid con tamaño grande -->
<span class="mi-home-solid mi-2x"></span>

<!-- duotone animado -->
<span class="mi-refresh-duotone mi-spin"></span>
```

**Componente `<mi-icon>`** — con control total desde el template:

```html
<mi-icon name="home" />

<mi-icon
  name="heart"
  variant="solid"
  color="#e11d48"
  size="24px"
/>

<mi-icon
  name="refresh"
  variant="duotone"
  color="#2563eb"
  secondary-color="#93c5fd"
  :secondary-opacity="0.3"
  animation="spin"
/>
```

**Composable `useIcon()`** — para acceso directo al SVG como string reactivo:

```ts
import { useIcon } from '@imagina-icons/vue'

const { svgContent } = useIcon('home')
const { svgContent: icon } = useIcon(computed(() => props.iconName))
```

```html
<svg viewBox="0 0 24 24" v-html="svgContent" />
```

---

## Uso en HTML puro

Incluye el CSS generado y usa clases directamente:

```html
<head>
  <link rel="stylesheet" href="/assets/imagina-icons.css">
</head>

<body>
  <span class="mi-home"></span>
  <span class="mi-search-solid mi-lg"></span>
  <span class="mi-refresh-duotone mi-spin"></span>
</body>
```

---

## Props del componente `<mi-icon>`

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `name` | `IconName` | — | **Requerido.** Nombre del icono. Autocompletado por TypeScript. |
| `variant` | `'outline' \| 'solid' \| 'duotone'` | `'outline'` | Variante visual. |
| `size` | `string \| number` | `'1em'` | Tamaño. String con unidad (`'24px'`) o número en px. |
| `color` | `string` | `'currentColor'` | Color principal. |
| `secondary-color` | `string` | `'currentColor'` | Color secundario (solo duotone). |
| `secondary-opacity` | `number` | `0.3` | Opacidad del color secundario (solo duotone). |
| `stroke-width` | `string \| number` | `2` | Grosor del trazo (solo outline). |
| `animation` | `'none' \| 'spin' \| 'pulse' \| 'bounce' \| 'ping'` | `'none'` | Animación CSS. |

---

## Clases CSS modificadoras

### Tamaños

| Clase | Tamaño |
|---|---|
| `.mi-xs` | `0.75em` |
| `.mi-sm` | `0.875em` |
| `.mi-md` | `1em` |
| `.mi-lg` | `1.25em` |
| `.mi-xl` | `1.5em` |
| `.mi-2x` | `2em` |
| `.mi-3x` | `3em` |
| `.mi-4x` | `4em` |

### Animaciones

| Clase | Efecto |
|---|---|
| `.mi-spin` | Rotación continua |
| `.mi-pulse` | Rotación en pasos (8 steps) |
| `.mi-bounce` | Rebote vertical |
| `.mi-ping` | Pulso expansivo |

### CSS Custom Properties

```css
:root {
  --mi-size: 1em;
  --mi-color: currentColor;
  --mi-stroke-width: 2;
  --mi-secondary-color: currentColor;
  --mi-secondary-opacity: 0.3;
}
```

---

## Desarrollo del monorepo

### Instalación

```bash
git clone https://git.imaginadesarrollo.es/packages/imagina-icons.git
cd imagina-icons
npm install
```

### Comandos disponibles

```bash
# Compilar todos los paquetes
npm run build

# Compilar solo core (SVGs + CSS)
npm run build:core

# Compilar solo vue
npm run build:vue

# Modo desarrollo (rebuild de core + watch de vue)
npm run dev
```

### Añadir un icono nuevo

1. Crea el archivo del icono en `packages/core/src/icons/{nombre}.ts`:

```ts
import type { IconDefinition } from '../types'

export const nombre: IconDefinition = {
  outline:  `<path d="..."/>`,
  solid:    `<path fill="currentColor" stroke="none" d="..."/>`,
  duotone:  `<path fill="var(--mi-sc)" fill-opacity="var(--mi-so)" stroke="none" d="..."/>
             <path d="..."/>`,
}
```

2. Importa y exporta desde `packages/core/src/icons/index.ts`:

```ts
import { nombre } from './nombre'

export const icons = {
  // ...iconos existentes,
  nombre,
} as const
```

3. Reconstruye el core:

```bash
npm run build:core
```

El CSS y el preview HTML se regeneran automáticamente.

### Categorías en el preview

Para organizar los iconos por categorías en `dist/index.html`, edita el objeto `CATEGORY_MAP` al inicio de `packages/core/scripts/build-css.js`:

```js
const CATEGORY_MAP = {
  'home':      'UI General',
  'search':    'UI General',
  'arrow-up':  'Flechas',
  'edit':      'Acciones',
  // ...
}
```

Los iconos sin entrada en el mapa se agrupan automáticamente por prefijo de nombre.

---

## Publicar una nueva versión

1. Actualiza la versión en `packages/core/package.json` y `packages/vue/package.json`.
2. Añade una entrada en `CHANGELOG.md`.
3. Haz commit y crea un tag:

```bash
git add .
git commit -m "chore: release v1.1.0"
git tag v1.1.0
git push origin main --tags
```

4. Publica en el GitLab Package Registry:

```bash
npm publish -w @imagina-icons/core
npm publish -w @imagina-icons/vue
```

---

## Licencia

Uso interno restringido a Imagina. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
