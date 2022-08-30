import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useUsers() {
  const store = useStore();
  const fetchUsers = () => store.dispatch('users/fetchUsers');

  onMounted(fetchUsers);

  return {
    users: computed(() => store.state.users.users),
  }
}
