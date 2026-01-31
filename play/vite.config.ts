import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOption from 'unplugin-vue-define-options/vite'
import jsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOption(), jsx()]
})
