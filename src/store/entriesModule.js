import axios from 'axios';

export const entriesModule = {
  state: () => ({
    entries: [],
    entriesLoading: true,
    filterSelected: '',
    sortOrder: 'asc',
    page: 1,
    limit: 10,
    totalPages: 0
  }),
  getters: {
    sortOrderComputed(state) {
      const array = [...state.entries].sort(
        (post1, post2) => {
          return post1.title?.localeCompare(post2.title)
      });
      if (state.sortOrder !== 'asc') {
        array.reverse();
      }
      return array;
    },
    filterSelectedComputed(state, getters) {
      if (!state.filterSelected) {
        return getters.sortOrderComputed;
      }
      return getters.sortOrderComputed.filter(
        (entry) => {
          return entry.userId.toString() == state.filterSelected;
        }
      );
    }
  },
  mutations: {
    setEntries(state, data) {
      state.entries = data;
    },
    setEntriesLoading(state, data) {
      state.entriesLoading = data;
    },
    setFilterSelected(state, data) {
      //alert('filter');
      //console.log(data);
      state.filterSelected = data;
    },
    setSortOrder(state, data) {
      //alert('sort');
      console.log(data);
      state.sortOrder = data;
    },
    setPage(state, data) {
      state.page = data;
    },
    setLimit(state, data) {
      state.limit = data;
    },
    setTotalPages(state, data) {
      state.totalPages = data;
    },

    entryRemove(state, entry) {
      state.entries = state.entries.filter(e => e.id !== entry.id);
    }

  },
  actions: {
    async fetchEntries({state, commit}) {
      try {
        commit('setEntriesLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setEntries', response.data);
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
      } catch(e) {
        console.log('Ошибка', e);
      } finally {
        commit('setEntriesLoading', false);
      }
    },
    async fetchEntriesMore({state, commit}) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setEntries', [...state.entries, ...response.data]);
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
      } catch(e) {
        console.log('Ошибка', e);
      }
    }
  },
  namespaced: true
}