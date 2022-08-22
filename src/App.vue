<template>

  <p>
    <router-link to="/">Go to Home</router-link>
    <router-link to="/new/">Создать пост</router-link>
  </p>
  
  <router-view
    v-model="entries"
    @create="entryCreate"
  >
  </router-view>

  <LikeDislike />
</template>

<script>
import LikeDislike from '@/components/LikeDislike.vue';

export default {
  name: 'App',
  components: {
    LikeDislike,
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
