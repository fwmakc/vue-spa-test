import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import components from '@/components/UI';

import PagesHome from "@/components/Pages/PagesHome";
import PagesPost from "@/components/Pages/PagesPost";
import PagesNew from "@/components/Pages/PagesNew";

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name:'pages-hello',
      component: PagesHome,
    },
    {
      path: '/post/:id',
      name:'pages-post',
      component: PagesPost,
      props: true,
    },
    {
      path: '/new/',
      name:'pages-new',
      component: PagesNew,
      props: true,
    }
  ]
});

app.use(router);
app.mount('#app');
