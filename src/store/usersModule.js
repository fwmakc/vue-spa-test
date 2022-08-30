import axios from 'axios';

export const usersModule = {
  state: () => ({
    users: []
  }),
  getters: {
  },
  mutations: {
    setUsers(state, data) {
      data.forEach(item => {
        if (!state.users.find(
          user => user.title === item.name && user.value === item.id
        )) {
          state.users.push({
            value: item.id,
            title: item.name
          });
        }
      });
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