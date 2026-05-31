import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Element Plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// Font
import '@/styles/useFonts.scss'
// Global styles
import '@/styles/global.scss'

const app = createApp(App)

app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
