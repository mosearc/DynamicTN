import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import FeedView from '@/views/FeedView.vue'
import ContentDetailView from '@/views/ContentDetailView.vue'
import CommentsView from '@/views/CommentsView.vue'
import CreateCommentView from '@/views/CreateCommentView.vue'


const routes: Array<RouteRecordRaw> = [
  {path: '/login', component: LoginView},
  {path: '/register', component: RegisterView},
  {path: '/',name: 'Feed',component: FeedView},
  {path: '/feed/:id',name: 'ContentDetail',component: ContentDetailView},
  {path: '/comments/:id',name: 'Comments',component: CommentsView},
  {path: '/createComment/:id',name: 'createComment',component: CreateCommentView},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
