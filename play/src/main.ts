import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from '@x-future/components/icon'
import Tree from '@x-future/components/tree'
import Button from '@x-future/components/button'
import '@x-future/theme-chalk/src/index.scss'

const plugins = [Icon, Tree, Button]
const app = createApp(App)

plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
