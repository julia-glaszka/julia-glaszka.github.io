<template>
  <Layout>
    <main>
      <navigation-back />

      <header class="section">
        <div class="container">
          <div class="">
            <h1 class="title">#{{ titleCase($page.tag.title) }}</h1>
            <p class="is-size-6">Liczba postów: {{ $page.tag.belongsTo.totalCount }}</p>
            <title id="tagIcon">Posts tagged</title>
          </div>
        </div>
      </header>

      <section class="section">
        <div class="container">
          <posts :posts="$page.tag.belongsTo" />
        </div>
      </section>

      <pagination :base="`${$page.tag.path}`" :info="$page.tag.belongsTo.pageInfo"
        v-if="$page.tag.belongsTo.pageInfo.totalPages > 1" />
    </main>
  </Layout>
</template>

<script>
  import config from '~/.temp/config.js'
  import Posts from '@/components/post/Posts'
  import Pagination from '@/components/navigation/Pagination'
  import NavigationBack from '@/components/navigation/NavigationBack'

  export default {
    components: {
      Pagination,
      NavigationBack,
      Posts,
    },

    methods: {
      titleCase(str) {
        return str.replace('-', ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
      }
    },
    computed: {
      config() {
        return config
      }
    },
  }

</script>
<style lang="scss">
  .image {
    float: left;
  }

</style>
<page-query>
  query Tag ($path: String!, $page: Int) {
  tag (path: $path) {
  id
  title
  path
  belongsTo (page: $page, perPage: 6) @paginate {
  totalCount
  pageInfo {
  totalPages
  currentPage
  }
  edges {
  node {
  ...on Post {
  id
  title
  datetime: date (format: "YYYY-MM-DD HH:mm:ss")
  path
  content
  excerpt
  description
  cover
  timeToRead
  author {
  id
  title
  }
  }
  }
  }
  }
  }
  }
</page-query>
