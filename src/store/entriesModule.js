import axios from 'axios';

export const entriesModule = {
  state: () => ({
    entries: [],
    storage: [],
    loading: true,
    pages: 0,
    more: false,
  }),
  getters: {
  },
  mutations: {
    setEntries(state, data) {
      state.entries = data;
    },
    setLoading(state, data) {
      state.loading = data;
    },
    setPages(state, data) {
      state.pages = data;
    },
    setMore(state, data) {
      state.more = data;
    },
    addEntry(state, entry) {
      state.storage.unshift(entry);
    },
    removeEntry(state, entry) {
      state.entries = state.entries.filter(e => e.id !== entry.id);
    }
  },
  actions: {
    async fetchEntries({state, commit}, values) {
      try {
        commit('setLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: values.page,
            _limit: values.limit
          }
        });
        const storage = state.more ? state.entries : (values.page === 1 ? state.storage : []);
        commit('setEntries', [...storage, ...response.data]);
        commit('setPages', Math.ceil(response.headers['x-total-count'] / values.limit));
      } catch(e) {
        console.log('Ошибка', e);
      } finally {
        commit('setLoading', false);
        commit('setMore', false);
      }
    }
  },
  namespaced: true
}