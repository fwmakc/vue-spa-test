<template>
  <v-select
    :value="modelValue"
    :label="label"
    :items="options"
    variant="plain"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></v-select>

  <!--
  <select
    :value="modelValue"
    // ^ @update:modelValue="$emit('update:modelValue', $event)"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option
      disabled
      value=""
    >
      Выберите из списка
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.title }}
    </option>
  </select>
  -->
</template>

<script>
export default {
  name: 'UiSelect',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  emits: [
    'update'
  ],
  methods: {
  },
}
</script>

<style scoped>
</style>
