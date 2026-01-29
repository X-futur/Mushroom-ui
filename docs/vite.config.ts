import { defineConfig } from 'vite'
import DefineOption from 'unplugin-vue-define-options/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [DefineOption()]
})
