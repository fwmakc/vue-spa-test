<template>
  <v-select
    :value="modelValue"
    :items="users"
    label="Автор"
    variant="plain"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></v-select>

  <!--
  <UiSelect
    :options="users"
    label="Автор"
    v-model="current"
    @update:modelValue="$emit('update:modelValue', current)"
  />
  -->
</template>

<script>
export default {
  name: 'EntriesFilter',
  props: {
    modelValue: {
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      current: this.modelValue
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
