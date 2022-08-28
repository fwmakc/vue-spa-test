<template>
  <div class="row">
    <EntriesSort
      v-model="sortOrder"
      @update:modelValue="entrySort"
    />
    <EntriesFilter
      :users="users"
      v-model="filterSelected"
      @update:modelValue="entryFilter"
    />
  </div>
  <div v-if="entries.length > 0">
    <EntriesList
      :entries-old="entries"
      :entries="filterSelectedComputed"
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
  <div>
    <div
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      :class="{
        'active': page === pageNumber
      }"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
  <div v-intersection="fetchEntriesMore"></div>
</template>

<script>
import EntriesList from '@/components/Entries/EntriesList.vue';
import EntriesSort from '@/components/Entries/EntriesSort.vue';
import EntriesFilter from '@/components/Entries/EntriesFilter.vue';
import axios from 'axios';

export default {
  name: 'PageHome',
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
      sortOrder: 'asc',
      page: 1,
      limit: 10,
      totalPages: 0
    }
  },
  methods: {
    changePage(pageNumber) {
      this.page = pageNumber;
      this.fetchEntries();
    },
    entryFilter(entry) {
      this.filterSelected = entry;
    },
    entrySort(entry) {
      this.sortOrder = entry;
    },
    entryCreate(entry) {
      this.entries.push(entry);
    },
    entryRemove(entry) {
      this.entries = this.entries.filter(e => e.id !== entry.id);
    },
    async fetchEntries() {
      try {
        this.entriesLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
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
    },
    async fetchEntriesMore() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.entriesFetch = this.entries = [...this.entriesFetch, ...response.data];
        const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.usersFetch = responseUsers.data;
        this.usersFetch.forEach(value => this.users.push({
          value: value.id,
          title: value.name
        }));
      } catch(e) {
        alert('Ошибка');
      }
    }
  },
  mounted() {
    this.fetchEntries();
  },
  computed: {
    sortOrderComputed() {
      const array = [...this.entries].sort(
        (post1, post2) => {
          return post1.title?.localeCompare(post2.title)
        });
      if (this.sortOrder !== 'asc') {
        array.reverse();
      }
      return array;
    },
    filterSelectedComputed() {
      if (!this.filterSelected) {
        return this.sortOrderComputed;
      }
      return this.sortOrderComputed.filter(
        (entry) => {
          return entry.userId.toString() == this.filterSelected;
        }
      );
    }
  },
  /*
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
  */
}
</script>

<style scoped>
</style>
