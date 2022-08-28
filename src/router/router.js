import { createRouter, createWebHistory } from 'vue-router';
import PageHome from "@/pages/Home";
import PagePost from "@/pages/Post";
import PageNew from "@/pages/New";
import PageStore from "@/pages/Store";
import PageComposition from "@/pages/Composition";

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
    path: '/store',
    name: 'store',
    component: PageStore
  },
  {
    path: '/new',
    name: 'new',
    component: PageNew,
    props: true,
  },
  {
    path: '/composition',
    name: 'composition',
    component: PageComposition
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;