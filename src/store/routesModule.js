import {computed} from 'vue';
import {useRouter} from 'vue-router';

//export default function useRouting() {
//  const currentRoute = computed(() => {
//    return useRoute().name
//  });
//  
//  return {
//    currentRoute
//  }
//}

export const routesModule = {
  state: () => ({
    routes: [],
    current: {},
    addition: [
      {
        name: 'home',
        icon: 'mdi-home',
        title: 'Главная'
      },
      {
        name: 'post',
        icon: 'mdi-file',
        title: 'Посты'
      },
      {
        name: 'store',
        icon: 'mdi-view-list',
        title: 'Хранилице'
      },
      {
        name: 'new',
        icon: 'mdi-plus',
        title: 'Создать новый'
      },
      {
        name: 'composition',
        icon: 'mdi-api',
        title: 'Composition API'
      }
    ]
  }),
  mutations: {
    setCurrentRoute(state) {
      state.current = computed(() => {
        const currentName = useRouter().currentRoute.value.name;
        const currentItem = state.addition.filter(
          (item) => {
            return item.name === currentName;
          }
        )
        return currentItem[0] ? currentItem[0] : {title: ''};
      });
    },
    setRoutes(state) {
      const routeArray = useRouter().getRoutes();
      state.routes = computed(() => {
        return routeArray;
        //return routeArray.filter(
        //  (item) => {
        //    return item.name !== 'home'
        //  }
        //)
      });
    }
  },
  namespaced: true
}