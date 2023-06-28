<template>
  <div class="tile pb-5">
    <div class="container">
      <!-- post image -->
      <p>
        <figure class="image p-0" v-if="post.cover">
          <g-link :to="`${post.path}/`">
            <g-image :src="post.cover" alt="Post cover photo" />
          </g-link>
        </figure>
      </p>

      <!-- post title -->
      <p class="pt-2 has-text-weight-bold">
        <g-link :to="`${post.path}/`">{{post.title}}</g-link>
      </p>
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
