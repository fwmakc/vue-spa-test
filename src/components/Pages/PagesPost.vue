<template>
  <div class="post" v-if="post">
    <h1 class="post__title">{{ post.title }}</h1>
    <p class="post__body">{{ post.body }}</p>
    <p class="post__id">{{ post.id }}</p>
  </div>
  <div class="author" v-if="author">
    <h1 class="author__name">{{ author.name }}</h1>
    <p class="author__email">{{ author.email }}</p>
  </div>
  <div
    v-for="comment in comments"
    :key="comment.id"
    class="comments"
  >
    <div class="comment" v-if="comment">
      <h1 class="comment__name">{{ comment.name }}</h1>
      <p class="comment__body">{{ comment.body }}</p>
      <p class="comment__email">{{ comment.email }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      post: null,
      author: null,
      comments: null,
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
  },
  watch: {
    '$route'() {
      this.getPost(this.id);
    }
  }
}
</script>

<style scoped>
.post {
}
.post__title {
}
.post__body {
}
.post__id {
}
</style>