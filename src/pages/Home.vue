<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
    >
      <v-select
        :value="sortOrder"
        :items="sortOptions"
        label="Сортировка"
        variant="plain"
        @update:modelValue="sortChange"
      ></v-select>
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-select
        :value="filter"
        :items="users"
        label="Автор"
        variant="plain"
        @update:modelValue="filterChange"
      ></v-select>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" v-if="filterComputed.length > 0">
      <EntriesItem
        v-for="entry in filterComputed"
        :key="entry.id"
        :entry="entry"
        entryName="post"
        @remove="removeEntry"
      />
    </v-col>
    <v-col cols="12" v-else>
      <p v-if="loading">
        Идет загрузка...
      </p>
      <p v-else>
        Список пуст
      </p>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      cols="12"
      class="text-center my-4"
    >
      <v-btn
        @click="fetchEntriesMore"
      >
        Загрузить еще
      </v-btn>
    </v-col>
    <v-col
      cols="12"
      class="text-center my-4"
    >
      <v-pagination
        v-model="page"
        :length="pages"
        rounded="circle"
        @update:modelValue="fetchEntriesPage"
      ></v-pagination>
    </v-col>
  </v-row>
  <v-row v-if="filterComputed.length > 0">
    <v-col cols="12">
      <!--
      <div v-intersection="fetchEntriesMore"></div>
      -->
    </v-col>
  </v-row>
</template>

<script>
import EntriesItem from '@/components/EntriesItem';
import { useUsers } from '@/hooks/useUsers';
import { useEntries } from '@/hooks/useEntries';
import { useSort } from '@/hooks/useSort';
import { useFilter } from '@/hooks/useFilter';

export default {
  name: 'PageHome',
  components: {
    EntriesItem
  },
  setup() {
    const {users} = useUsers();
    const {entries, loading, pages, page, limit, fetchEntriesPage, fetchEntriesMore, removeEntry} = useEntries();
    const {sortOrder, sortOptions, sortOrderComputed, sortChange} = useSort(entries);
    const {filter, filterComputed, filterChange} = useFilter(sortOrderComputed);

    return {
      users,
      entries, loading, pages, page, limit, fetchEntriesPage, fetchEntriesMore, removeEntry,
      sortOrder, sortOptions, sortOrderComputed, sortChange,
      filter, filterComputed, filterChange,
    }
  }
}
</script>

<style scoped>
</style>
