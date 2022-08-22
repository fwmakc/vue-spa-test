<template>
  <div>
    <entries-item
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
      @remove="$emit('remove', entry)"
    />
  </div>
</template>

<script>
import EntriesItem from '@/components/Entries/EntriesItem.vue';

export default {
  name: 'EntriesList',
  components: {
    EntriesItem
  },
  props: {
    entries: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
