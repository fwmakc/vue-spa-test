<template>
  <div class="page" v-if="show">
    <div class="page__header">
      <ui-title
        :title="title"
      />
      <button
        v-if="close"
        class="page__close"
        @click="pageClose"
      >
        &times;
      </button>
    </div>
    <div class="page__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiPage',
  props: {
    close: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: [String, Number],
      default: 'Page Title',
      required: true
    }
  },
  methods: {
    pageClose() {
      console.log(this.show);
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
.page {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: white;
  position: fixed;
  height: 100%;
  overflow-y: auto;
}
.page__header {
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
}
.page__close {
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
}
.page__content {
  margin: 0;
  padding: 1rem;
}
</style>
