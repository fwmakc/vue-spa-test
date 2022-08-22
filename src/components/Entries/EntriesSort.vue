<template>
  <ui-select
    v-model="modelValue"
    :options="sortOptions"
    @update="$emit('update', modelValue)"
  />
</template>

<script>
export default {
  name: 'EntriesSort',
  data() {
    return {
      modelValue: 'asc',
      sortOptions: [
        {
          value: 'asc',
          title: 'В алфавитном порядке'
        },
        {
          value: 'desc',
          title: 'В обратном порядке'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
