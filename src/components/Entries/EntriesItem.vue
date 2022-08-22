<template>
  <div>
    #{{ entry.id }}
    <strong>Название:</strong>
    <a
      :href="'/post/' + entry.id"
    >
      {{ entry.title }}
    </a>
    <strong>Описание:</strong> {{ entry.body }}
  </div>
  <div>
    <ui-button
      @click="$emit('remove', entry)"
    >
      Удалить
    </ui-button>
  </div>
</template>

<script>
export default {
  name: 'EntriesItem',
  props: {
    entry: {
      type: Object,
      required: true
    },
    users: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
