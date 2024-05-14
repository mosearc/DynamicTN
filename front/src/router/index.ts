import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import FeedView from '@/views/FeedView.vue'
import ContentDetailView from '@/views/ContentDetailView.vue'

const routes: Array<RouteRecordRaw> = [
  {path: '/login', component: LoginView},
  {path: '/register', component: RegisterView},
  {path: '/',name: 'Feed',component: FeedView},
  {path: '/feed/:id',name: 'ContentDetail',component: ContentDetailView},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
