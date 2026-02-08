import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts' // 用于自动生成 .d.ts 文件

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({ outDir: 'dist', staticImport: true, insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: './index.ts',
      name: 'XFutureComponents',
      fileName: format => `index.${format === 'es' ? 'mjs' : 'umd.js'}`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', '@x-future/utils', '@x-future/theme-chalk'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
