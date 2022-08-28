import axios from 'axios';
import {ref, onMounted} from 'vue';

export default function useEntries(limit) {
  const entries = ref([]);
  const page = ref(1);
  const entriesLoading = ref(true);
  const totalPages = ref(0);
  
  const fetching = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page.value,
          _limit: limit
        }
      });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      entries.value = response.data;
      //const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
      //this.usersFetch = responseUsers.data;
      //this.usersFetch.forEach(value => this.users.push({
      //  value: value.id,
      //  title: value.name
      //}));
    } catch(e) {
      alert('Ошибка');
    } finally {
      entriesLoading.value = false;
    }
  }

  onMounted(fetching);

  return {
    entries,
    entriesLoading,
    page,
    totalPages
  }
}