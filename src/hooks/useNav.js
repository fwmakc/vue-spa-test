import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useNav() {
  const nav = [
    {
      name: 'home',
      icon: 'mdi-home',
      title: 'Главная'
    },
    {
      name: 'entry',
      icon: 'mdi-file',
      title: 'Посты'
    },
    {
      name: 'new',
      icon: 'mdi-plus',
      title: 'Создать новый'
    }
  ];

  const store = useStore();
  const setNav = () => store.commit('routes/setNav', nav);
  const setRoutes = () => store.commit('routes/setRoutes');
  const setCurrentRoute = () => store.commit('routes/setCurrentRoute');

  onMounted([
    setNav,
    setRoutes,
    setCurrentRoute
  ]);

  return {
    routes: computed(() => store.state.routes.routes),
    current: computed(() => store.state.routes.current),
    nav: computed(() => store.state.routes.nav),
  }
}
