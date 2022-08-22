<template>
  <input
    :value="modelValue"
    @input="inputUpdate"
    type="text"
  >
</template>

<script>
export default {
  name: 'UiInput',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    inputUpdate(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
</style>
