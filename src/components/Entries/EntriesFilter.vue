<template>
  <ui-select
    v-model="modelValue"
    :options="users"
    @update="$emit('update', modelValue)"
  />
</template>

<script>
export default {
  name: 'EntriesFilter',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      modelValue: ''
    }
  }
}
</script>

<style scoped>
</style>
