<template>
  <header>
  <navigation-back/>
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-centered">
            <div class="column is-half-desktop">
              <h5 class="has-text-6 is-uppercase">
                {{ post.timeToRead }} min czytania
              </h5>
              <h1 class="title is-size-2 p-t-md">
                {{ post.title }}
              </h1>
              <h2 class="subtitle p-t-md">
                <span v-if="post.author">
                  <g-link :to="`${post.author.path}/`"
                    class="text-gray-700 capitalize border-b border-transparent hover:border-gray-400 transition-colors duration-300">
                    {{ titleCase(post.author.title) }}</g-link> &bull;
                </span>
                <time :datetime="post.datetime" class="capitalize">{{ formattedPublishDate }}</time>
              </h2>
            </div>
          </div>

        </div>
      </div>
    </section>
    <div class="section" v-if="post.cover">
      <div class="container">
        <div class="columns is-centered">
          <div class="column image-container">
              <img class="" :src="post.cover" :alt="post.title">

          </div>
        </div>


      </div>
    </div>

  </header>
</template>

<style lang="scss" scoped>
  .is-half-height {
    height: auto;
    max-height: 50vh;
    width: 100%;
    max-width: 100%;
  }
  .image-container {
    justify-content: center;
    display: flex;
  }
img {
  margin: auto;
}
</style>
<script>
  import moment from 'moment'
  import NavigationBack from '@/components/NavigationBack'
  export default {
    props: ['post'],
    components: {
      NavigationBack
    },
    methods: {
      titleCase(str) {
        return str.replace('-', ' ')
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')
      }
    },
    computed: {
      formattedPublishDate() {
        return moment(this.post.datetime).format('DD MMMM, YYYY');
      },
      speedFactor() {
        return this.post.fullscreen ? 0.21 : 0.37
      }
    },
  }

</script>
