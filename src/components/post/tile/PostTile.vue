<template>
  <div class="tile is-12">
    <div class="container">
      <!-- post title -->
      <h5 class="title is-size-5 has-padding-bottom-10 ">
        <g-link :to="`${post.path}/`">{{post.title}}</g-link>
      </h5>

      <!-- post tags -->
      <div class="subtitle is-size-6" v-if="post.tags">
        <post-tags :tags="post.tags" />
      </div>

      <!-- short description -->
      <p class="is-size-6" v-if="post.description">
        {{post.description}}
      </p>

      <!-- post metadata -->
      <div class="pt-3">
        <span v-if="post.author">
          {{ titleCase(post.author.title) }} ·
        </span>
        <time v-if="post.datetime" :datetime="post.datetime" class="">{{ formatPublishDate(post.datetime) }}</time>
        <span v-if="post.author || (post.tags && post.tags.length > 0)"> · </span>
        <span v-if="post.timeToRead">{{ post.timeToRead }} min</span>
      </div>

    </div>
  </div>

</template>
<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    border-radius: 15px;
  }

</style>
<script>
  import moment from 'moment'
  import 'moment/locale/pl'
  import PostTags from '@/components/post/Tags'


  export default {
    components: {
      PostTags
    },
    props: ['post', 'index'],
    computed: {
      formattedPublishDate() {
        return moment(this.post.datetime).locale('pl').format('DD MMMM, YYYY');
      },

      shouldHidePostMetadata() {
        return !this.post || (!this.post.author && !this.post.datetime && !this.post.timeToRead && !this.post.tags)
      }
    },
    methods: {
      formatPublishDate(date) {
        return moment(date).locale('pl').format('DD MMMM, YYYY');
      },
      titleCase(str) {
        return str.replace('-', ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
      }
    },
  }

</script>
