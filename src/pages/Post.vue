<template>
  <v-img
    class="align-end mt-md-10"
    width="100%"
    height="100%"
    max-height="50vh"
    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    cover
    style="position: relative;"
  >
    <v-container
      style="position: absolute; top: 0; left: 0;"
    >
      <v-btn
        variant="plain"
        color="white"
        icon
        @click="$router.back()"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-container>
    <v-container
      class="text-white "
    >
      <v-row
        class="px-3 py-4 text-uppercase"
      >
        <v-col
          cols="12"
        >
          {{ author.name }}
        </v-col>
        <v-col
          cols="12"
          class="text-h4 py-1 text-uppercase"
        >
          {{ post.title }}
        </v-col>
        <v-col
          cols="12"
        >
          <v-badge
            :content="`# ${post.id}`"
            color="white"
            inline
          ></v-badge>
        </v-col>
      </v-row>
    </v-container>
  </v-img>

  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="my-4"
      >
        {{ post.body }}
      </v-col>
    </v-row>

    <v-row v-if="author">
      <v-col
        cols="12"
        class="my-2"
      >
        <v-divider></v-divider>
      </v-col>
      <v-col
        cols="12"
        class="py-0"
      >
        <h2
          class="px-3 pb-2"
        >
          Автор
        </h2>
      </v-col>
      <v-col
        cols="12"
        class="ml-2"
      >
        <v-row
        >
          <v-col
            cols="auto"
          >
            <v-avatar
              color="info"
              size="x-large"
            >
              64
            </v-avatar>
          </v-col>
          <v-col>
            <p class="">
              <strong>
                {{ author.name }}
              </strong>
            </p>
            <p class="text-grey">
              {{ author.email }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="comments">
      <v-col
        cols="12"
        class="my-2"
      >
        <v-divider></v-divider>
      </v-col>
      <v-col
        cols="12"
      >
        <h2
          class="px-3 pb-2"
        >
          Комментарии
        </h2>
        <v-list lines="two">
          <v-list-item
            v-for="comment in comments"
            :key="comment.id"
            :title="comment.email"
            :subtitle="comment.name + '. ' + comment.body"
          >
            <template v-slot:prepend>
              <v-avatar color="grey-lighten-1">
                <v-icon color="white">mdi-chevron-right</v-icon>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PagePost',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      post: {
        id: null,
        userId: null,
        title: '',
        body: '',
      },
      author: {
        id: 0,
        name: '',
        username: '',
        email: '',
        address: {},
        phone: '',
        website: '',
        company: {}
      },
      comments: [],
      linkPost: 'https://jsonplaceholder.typicode.com/posts/',
      linkAuthor: 'https://jsonplaceholder.typicode.com/users/',
    }
  },
  methods: {
    getPost(id) {
      axios(this.linkPost + id)
        .then(response => {
          this.post = response.data;
          axios(this.linkAuthor + this.post.userId + '')
            .then(response => {
              this.author = response.data;
              console.log(response.data);
            })
            .catch(error => {
              console.log('error', error);
            });
          axios(this.linkPost + id + '/comments')
            .then(response => {
              this.comments = response.data;
              console.log(response.data);
            })
            .catch(error => {
              console.log('error', error);
            });
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  },
  created() {
    this.getPost(this.id);
  }
}
</script>

<style scoped>
</style>