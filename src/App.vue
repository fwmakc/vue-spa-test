<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container>
        <RouterView
          v-model="entries"
          @create="entryCreate"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/Sections/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
  }),
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
}
</style>
