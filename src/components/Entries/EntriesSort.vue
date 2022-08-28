<template>
  <v-select
    :value="modelValue"
    :items="sortOptions"
    label="Сортировка"
    variant="plain"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></v-select>

  <!--
  <UiSelect
    :options="sortOptions"
    label="Сортировка"
    v-model="current"
    @update:modelValue="$emit('update:modelValue', current)"
  />
  -->
</template>

<script>
export default {
  name: 'EntriesSort',
  data() {
    return {
      current: this.modelValue,
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
