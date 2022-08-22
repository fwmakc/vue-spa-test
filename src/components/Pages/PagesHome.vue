<template>
  <div class="row">
    <entries-sort
      v-model="sortOrder"
      @update="entryFilter"
    />
    <entries-filter
      :users="users"
      v-model="filterSelected"
      @update="entryFilter"
    />
  </div>
  <div v-if="entries.length > 0">
    <entries-list
      :entries="entries"
      @remove="entryRemove"
    />
  </div>
  <div v-else>
    <p v-if="entriesLoading">
      Идет загрузка...
    </p>
    <p v-else>
      Список пуст
    </p>
  </div>
</template>

<script>
//import LikeDislike from '@/components/LikeDislike.vue';
import EntriesList from '@/components/Entries/EntriesList.vue';
import EntriesSort from '@/components/Entries/EntriesSort.vue';
import EntriesFilter from '@/components/Entries/EntriesFilter.vue';
import axios from 'axios';

export default {
  name: 'PagesHome',
  components: {
    EntriesList,
    EntriesSort,
    EntriesFilter
  },
  data() {
    return {
      users: [],
      usersFetch: [],
      entries: [],
      entriesFetch: [],
      entriesLoading: true,
      filterSelected: '',
      sortOrder: ''
    }
  },
  methods: {
    entryCreate(entry) {
      this.entries.push(entry);
    },
    entryRemove(entry) {
      this.entries = this.entries.filter(e => e.id !== entry.id);
    },
    async fetchEntries() {
      try {
        this.entriesLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.entriesFetch = this.entries = response.data;
        const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.usersFetch = responseUsers.data;
        this.usersFetch.forEach(value => this.users.push({
          value: value.id,
          title: value.name
        }));
      } catch(e) {
        alert('Ошибка');
      } finally {
        this.entriesLoading = false;
      }
    }
  },
  mounted() {
    this.fetchEntries();
  },
  watch: {
    sortOrder(value) {
      this.entries.sort(
        (post1, post2) => {
          return post1.title?.localeCompare(post2.title)
        });
      if (value !== 'asc') {
        this.entries.reverse();
      }
    },
    filterSelected(value) {
      if (!value) {
        return;
      }
      this.entries = this.entriesFetch.filter(
        (entry) => {
          return entry.userId.toString() == value;
        }
      );
    }
  }
}
</script>

<style scoped>
</style>
