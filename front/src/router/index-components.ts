import { createRouter, createWebHistory } from 'vue-router'
import FeedView from '../views/FeedView.vue'
import ContentDetailView from '../views/ContentDetailView.vue'
import AccountView from '../views/AccountView.vue'

const routes = [
  {
    path: '/feed',
    name: 'Feed',
    component: FeedView
  },
  {
    path: '/feed/:id',
    name: 'ContentDetail',
    component: ContentDetailView
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountView
  },
  {
    path: '/',
    redirect: '/feed'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
