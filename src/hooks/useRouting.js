import {computed} from 'vue';
import {useRoute} from 'vue-router';

export default function useRouting() {
  const currentRoute = computed(() => {
    return useRoute().name
  });
  
  return {
    currentRoute
  }
}
