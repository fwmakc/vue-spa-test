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
      :entryName="entryName"
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
import {useEntries} from '@/hooks/useEntries';
import {useSort} from '@/hooks/useSort';
import {useFilter} from '@/hooks/useFilter';
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
      limit: 10,
    }
  },
  setup() {
    const {entries, entriesLoading, page, totalPages} = useEntries(10);
    const {sortOrder, sortOrderComputed} = useSort(entries);
    const {filterSelected, filterSelectedComputed} = useFilter(sortOrderComputed);
    
    return {
      entries,
      entriesLoading,
      page,
      totalPages,
      sortOrder,
      sortOrderComputed,
      filterSelected,
      filterSelectedComputed
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
  }
}
</script>

<style scoped>
</style>
