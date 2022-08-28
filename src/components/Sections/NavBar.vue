<template>

  <v-navigation-drawer app
    v-model="drawer"
    absolute
    temporary
  >
    <v-list
      nav
      dense
      class="mt-3"
    >
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item
          v-for="item in addition"
          :key="item.name"
          @click="$router.push({ name: item.name })"
        >
          <v-list-item-title>
            <v-list-item-icon class="mr-3 text-grey">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app
    color="light-blue"
    dark
    class="text-white"
  >
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>{{ current.title }}</v-toolbar-title>
  </v-app-bar>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
//import { useRouting } from '@/hooks/useRouting';

export default {
  name: 'NavBar',
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    ...mapMutations({
      setRoutes: 'routes/setRoutes',
      setCurrentRoute: 'routes/setCurrentRoute',
    })
  },
  mounted() {
    this.setRoutes();
    this.setCurrentRoute();
  },
  computed: {
    ...mapState({
      routes: state => state.routes.routes,
      current: state => state.routes.current,
      addition: state => state.routes.addition,
    })
  },
  setup () {
  }
}
</script>

<style scoped>
</style>