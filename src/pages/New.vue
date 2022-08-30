<template>
  <v-form @submit.prevent>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-select
            :items="users"
            label="Автор"
            variant="underlined"
            v-model="entry.userId"
          ></v-select>
        </v-col>
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
        <v-col
          cols="12"
          v-show="error"
          class="text-red"
        >
          Ошибка! Внимательно заполните данные и повторите попытку через некоторое время
        </v-col>
        <v-col cols="12">
          <v-btn
            text
            color="orange lighten-2 accent-4"
            @click="entryCreate"
          >
            Создать
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios';
import { useUsers } from '@/hooks/useUsers';
import { useEntries } from '@/hooks/useEntries';

export default {
  name: 'PageNew',
  components: {
  },
  data: () => ({
    error: false,
    entry: {
      id: null,
      userId: null,
      title: '',
      body: ''
    }
  }),
  methods: {
    entryCreate(entry) {

      if (
        !this.entry.userId
        || !this.entry.title
        || !this.entry.body
      ) {
        return;
      }
      
      this.entry.id = Date.now();

      axios('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(entry),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
        .then(
          (response) => {
            if (response.status === 201) {
              this.addEntry(this.entry);
              this.clearEntry();
              this.error = false;
              this.$router.push({ name: 'home' });
            } else {
              this.error = true;
            }
          }
        );
    },
    clearEntry() {
      this.entry = {
        id: null,
        userId: null,
        title: '',
        body: ''
      };
    }
  },
  setup() {
    const {users} = useUsers();
    const {entries, addEntry} = useEntries();

    return {
      users,
      entries, addEntry
    }
  }
}
</script>

<style scoped>
</style>
