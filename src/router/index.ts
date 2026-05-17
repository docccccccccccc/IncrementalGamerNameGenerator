import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { component: () => import('@/views/MainPage.vue'), path: '/' },
    { component: () => import('@/views/CelestialStyled.vue'), path: '/cel' },
    { component: () => import('@/views/E308Styled.vue'), path: '/e308' },
    { component: () => import('@/views/AboutPage.vue'), path: '/about' },
  ],
})

export default router
