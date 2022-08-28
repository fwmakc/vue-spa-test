import axios from 'axios';

export const usersModule = {
  state: () => ({
    users: []
  }),
  getters: {
  },
  mutations: {
    setUsers(state, data) {
      data.forEach(value => state.users.push({
          value: value.id,
          title: value.name
      }));
    }
  },
  actions: {
    async fetchUsers({commit}) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data);
      } catch(e) {
        console.log('Ошибка', e);
      }
    }
  },
  namespaced: true
}