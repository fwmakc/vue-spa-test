<template>
  <v-card
    elevation="2"
    class="mx-auto my-3"
  >
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-img
          class="align-end"
          width="100%"
          height="100%"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          style="cursor: pointer"
          cover
          @click="$router.push({ name: entryName, params: { id: entry.id } })"
        >
          <div
            class="text-h4 text-white px-3 py-3 d-block d-md-none"
          >
            {{ entry.title }}
          </div>
        </v-img>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-card-text class="pt-0 pt-md-4">
          <div class="text-grey pb-md-2">
            # {{ entry.id }}
          </div>
          <p
            class="text-h4 text--primary d-none d-md-block"
            style="cursor: pointer"
            @click="$router.push({ name: entryName, params: { id: entry.id } })"
          >
            {{ entry.title }}
          </p>
          <div class="text--primary pt-3">
            {{ entry.body }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="orange lighten-2 accent-4"
            @click="$router.push({ name: entryName, params: { id: entry.id } })"
          >
            Открыть
          </v-btn>
          <v-btn
            text
            color="orange lighten-2 accent-4"
            @click="$emit('remove', entry)"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'EntriesItem',
  props: {
    entryName: {
      type: String,
      required: true
    },
    entry: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
