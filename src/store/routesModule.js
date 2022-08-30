import {computed} from 'vue';
import {useRouter} from 'vue-router';

export const routesModule = {
  state: () => ({
    routes: [],
    current: {},
    nav: []
  }),
  mutations: {
    setCurrentRoute(state) {
      state.current = computed(() => {
        const currentName = useRouter().currentRoute.value.name;
        const currentItem = state.nav.filter(
          (item) => {
            return item.name === currentName;
          }
        )
        return currentItem[0] ? currentItem[0] : {title: ''};
      });
    },
    setRoutes(state) {
      const routeArray = useRouter().getRoutes();
      state.routes = computed(() => routeArray);
    },
    setNav(state, data) {
      state.nav = computed(() => data);
    }
  },
  namespaced: true
}