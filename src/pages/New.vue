<template>
  <div>
    <EntriesNew
      @create="entryCreate"
    />
  </div>
</template>

<script>
import EntriesNew from '@/components/EntriesNew.vue';
import axios from 'axios';

export default {
  name: 'PageNew',
  components: {
    EntriesNew
  },
  props: {
    //entries: {
    //  type: Array,
    //  required: true
    //}
  },
  methods: {
    entryCreate(entry) {
      //this.entries.push(entry);
      axios('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: entry.title,
          body: entry.body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => { console.log(response)});
    }
  }
}
</script>

<style scoped>
</style>
