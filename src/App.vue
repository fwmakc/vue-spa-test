<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container
        :class="{
          'px-0': $route.name === 'post',
          'py-0': $route.name === 'post',
        }"
      >
        <RouterView
          v-model="entries"
          @create="entryCreate"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
