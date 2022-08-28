<template>
  <div>
    <EntriesItem
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
      :entryName="entryName"
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
    entryName: {
      type: String,
      required: true
    },
    entries: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
