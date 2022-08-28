<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
    >
      <EntriesSort
        :modelValue="sortOrder"
        @update:modelValue="setSortOrder"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <EntriesFilter
        :users="users"
        :modelValue="filterSelected"
        @update:modelValue="setFilterSelected"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" v-if="entries.length > 0">
      <EntriesList
        entryName="post"
        :entries="filterSelectedComputed"
        @remove="entryRemove"
      />
    </v-col>
    <v-col cols="12" v-else>
      <p v-if="entriesLoading">
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
      <v-pagination
        v-model="pageSelect"
        :length="totalPages"
        rounded="circle"
      ></v-pagination>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <div v-intersection="fetchEntriesMore"></div>
    </v-col>
  </v-row>
</template>

<script>
import EntriesList from '@/components/Entries/EntriesList.vue';
import EntriesSort from '@/components/Entries/EntriesSort.vue';
import EntriesFilter from '@/components/Entries/EntriesFilter.vue';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: 'PageStore',
  components: {
    EntriesList,
    EntriesSort,
    EntriesFilter
  },
  data: () => ({
    pageSelect: 1
  }),
  methods: {
    ...mapMutations({
      setPage: 'entries/setPage',
      setSortOrder: 'entries/setSortOrder',
      setFilterSelected: 'entries/setFilterSelected',
      entryRemove: 'entries/entryRemove',
      setUsers: 'users/setUsers',
    }),
    ...mapActions({
      fetchEntries: 'entries/fetchEntries',
      fetchEntriesMore: 'entries/fetchEntriesMore',
      fetchUsers: 'users/fetchUsers',
    }),
    entryCreate(entry) {
      this.entries.push(entry);
    }
  },
  mounted() {
    this.fetchEntries();
    this.fetchUsers();
  },
  computed: {
    ...mapState({
      entries: state => state.entries.entries,
      entriesLoading: state => state.entries.entriesLoading,
      filterSelected: state => state.entries.filterSelected,
      sortOrder: state => state.entries.sortOrder,
      page: state => state.entries.page,
      limit: state => state.entries.limit,
      totalPages: state => state.entries.totalPages,
      users: state => state.users.users
    }),
    ...mapGetters({
      sortOrderComputed: 'entries/sortOrderComputed',
      filterSelectedComputed: 'entries/filterSelectedComputed',
    })
  },
  watch: {
    pageSelect(value) {
      this.setPage(value);
      this.fetchEntries();
    }
  }
}
</script>

<style scoped>
</style>