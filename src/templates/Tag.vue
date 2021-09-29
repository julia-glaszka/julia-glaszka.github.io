<template>
  <Layout>
  <jNavbar/>
    <main>
      <navigation-back />
      <header class="section">
        <div class="container">
          <div class="">


             <p class="is-size-6">{{ $page.tag.belongsTo.totalCount }} posts in total</p>
            <h1 class="title"> <figure class="image is-24x24 m-r-sm">
              <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" role="img" aria-labelledby="tagIcon">

              <path d="M0 10V2l2-2h8l10 10-10 10L0 10zm4.5-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>

            </figure> {{ titleCase($page.tag.title) }}</h1>

 <title id="tagIcon">Posts tagged</title>
          </div>

        </div>

      </header>
      <section class="section">
        <div class="container">
        <posts :posts="$page.tag.belongsTo"/>
        </div>
        <!-- <post-item v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node" /> -->
      </section>
      <pagination :base="`${$page.tag.path}`" :info="$page.tag.belongsTo.pageInfo"
        v-if="$page.tag.belongsTo.pageInfo.totalPages > 1" />
      <site-footer class="" />
    </main>
  </Layout>
</template>

<script>
  import moment from 'moment'
  import config from '~/.temp/config.js'
  import PostItem from '@/components/PostItem'
  import Posts from '@/components/Posts'
  import SiteFooter from '@/components/Footer'
  import Pagination from '@/components/Pagination'
  import NavigationBack from '@/components/NavigationBack'
  import JNavbar from '@/components/JNavbar'

  export default {
    components: {
      PostItem,
      Pagination,
      SiteFooter,
      NavigationBack,
      Posts,
      JNavbar
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
              path
            }
          }
        }
      }
    }
  }
}
</page-query>
