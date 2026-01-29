import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from '@x-future/components/icon'
import '@x-future/theme-chalk/src/index.scss'

const plugins = [Icon]
const app = createApp(App)

plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
