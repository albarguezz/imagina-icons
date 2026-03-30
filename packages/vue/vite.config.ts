import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ['src'], outDir: 'dist' }) as any,
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ImaginaIconsVue',
      fileName: (format) => `imagina-icons-vue.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@imagina-icons/core'],
      output: {
        exports: 'named',
        globals: { vue: 'Vue' }
      },
    },
  },
})