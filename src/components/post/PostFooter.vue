<template>
  <footer v-if="post.author || post.tags">
    <post-tags :tags="post.tags"/>
    <author-info :author="post.author"/>
  </footer>
</template>

<script>
import AuthorInfo from '@/components/AuthorInfo'
import PostTags from '@/components/tag/Tags'

export default {
  props: ['post'],
  components: {
    AuthorInfo,
    PostTags
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