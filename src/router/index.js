import { createRouter, createWebHistory } from 'vue-router';
import PageHome from "@/pages/Home";
import PagePost from "@/pages/Post";
import PageNew from "@/pages/New";

const routes = [
  {
    path: '/',
    name: 'home',
    component: PageHome,
    exact: true
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PagePost,
    props: true,
  },
  {
    path: '/new',
    name: 'new',
    component: PageNew,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;