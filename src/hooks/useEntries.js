import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export function useEntries() {
  const page = ref(1);
  const limit = ref(10);

  const store = useStore();
  const fetchEntries = () => {
    store.dispatch('entries/fetchEntries', {page: page.value, limit: limit.value});
  }
  const fetchEntriesMore = () => {
    page.value += 1;
    store.commit('entries/setMore', true);
    fetchEntries();
  }
  const fetchEntriesPage = (value) => {
    page.value = value;
    fetchEntries();
  }
  const addEntry = (entry) => {
    store.commit('entries/addEntry', entry);
  }
  const removeEntry = (entry) => {
    store.commit('entries/removeEntry', entry);
  }

  onMounted(fetchEntries);

  return {
    entries: computed(() => store.state.entries.entries),
    storage: computed(() => store.state.entries.storage),
    loading: computed(() => store.state.entries.loading),
    pages: computed(() => store.state.entries.pages),
    page,
    limit,
    fetchEntriesPage,
    fetchEntriesMore,
    removeEntry,
    addEntry
  }
}