<template>
  <form @submit.prevent>
    <ui-input
      v-model="entry.title"
      placeholder="Название"
    />
    <ui-input
      v-model="entry.body"
      placeholder="Описание"
    />
    <button @click="createEntry">Создать</button>
  </form>
</template>

<script>
export default {
  name: 'EntriesNew',
  data() {
    return {
      entry: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createEntry() {
      if (
        !this.entry.title
        || !this.entry.body
      ) {
        return;
      }
      this.entry.id = Date.now();
      this.$emit('create', this.entry);
      this.entry = {
        title: '',
        body: ''
      };
    }
  }
}
</script>

<style scoped>
</style>
