<template>
  <v-form @submit.prevent>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-focus
            v-model="entry.title"
            label="Название"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            solo
            v-model="entry.body"
            label="Описание"
            variant="underlined"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-btn
            text
            color="orange lighten-2 accent-4"
            @click="createEntry"
          >
            Создать
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'EntriesNew',
  data() {
    return {
      entry: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createEntry() {
      if (
        !this.entry.title
        || !this.entry.body
      ) {
        return;
      }
      this.entry.id = Date.now();
      this.$emit('create', this.entry);
      this.entry = {
        title: '',
        body: ''
      };
      this.$router.push({ name: 'store' });
    }
  }
}
</script>

<style scoped>
</style>
