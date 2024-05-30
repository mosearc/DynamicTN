import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Feed from '@/views/Feed.vue';
import postDetail from '@/views/postDetail.vue';
import postCreate from "@/views/postCreate.vue";
import pollDetail from "@/views/pollDetail.vue";
import pollCreate from "@/views/pollCreate.vue";

const routes: Array<RouteRecordRaw> = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', name: 'FeedView', component: Feed },
  { path: '/feed/:id', name: 'PostDetail', component: postDetail },
  { path: '/postCreate', component: postCreate },
  { path: '/feed/polls/:id', name: 'PollDetail', component: pollDetail },
  { path: '/pollCreate', component: pollCreate }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
