import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import Contact from '@/pages/Contact.vue'
import Services from '@/pages/Services.vue'
import Blog from '@/pages/Blog.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/services', component: Services },
  { path: '/blog', component: Blog }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router