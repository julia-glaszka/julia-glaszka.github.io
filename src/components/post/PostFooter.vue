<template>
  <footer v-if="post.author || post.tags">
    <div class="tags are-medium">
      <g-link v-for="tag in post.tags" :key="tag.id" :to="`${tag.path}/`" class="tag is-dark is-rounded is-normal">
        {{ tag.title }}
      </g-link>
    </div>
    <hr>
<author-info :author="post.author"/>


  </footer>
</template>

<script>
import AuthorInfo from '@/components/AuthorInfo'

  export default {
    props: ['post'],
    components: {
      AuthorInfo
      },
    methods: {
      imageLoadError(e) {
        e.target.src = `/images/authors/default.png`
      },

      titleCase(str) {
        return str.replace('-', ' ')
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')
      },

    },

    computed: {
      config() {
        return config
      },
      avatar() {
        return `/assets/images/${this.post.author.id}.png`
      },

      postUrl() {
        let siteUrl = this.config.siteUrl
        let postPath = this.post.path

        return postPath ? `${siteUrl}${postPath}` : `${siteUrl}/${slugify(this.post.title)}/`
      }
    },
  }

</script>

<style lang="scss">

</style>
