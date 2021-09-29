<template>
  <Layout>
    <JNavbar />
    <main>
      <navigation-back />
      <div class="section">
        <div class="container">
          <div class="columns  is-centered ">
            <div class="column is-half-desktop has-column-centered has-text-centered">
              <figure class="image is-128x128 is-centered">
                <g-image class="is-rounded" src="@/assets/images/avatarLg.jpeg" alt="" />
              </figure>

              <h1 class="title is-size-3 has-padding-top-20">
                {{ titleCase($page.author.title) }}
              </h1>
              <h2>
                <p class="subtitle has-text-justified has-text-grey is-size-5 has-padding-top-10 has-margin-bottom-0"
                  v-for="line in $static.metadata.aboutAuthor">
                  {{ line }}
                </p>
              </h2>
            </div>

          </div>
        </div>
      </div>


      <section class="section">
        <div class="container">
          <h2 class="title has-text-centered">Posty</h2>
          <posts :posts="$page.author.belongsTo" />
        </div>
      </section>
      <pagination :base="`${$page.author.path}`" :info="$page.author.belongsTo.pageInfo"
        v-if="$page.author.belongsTo.pageInfo.totalPages > 1" />
      <site-footer class="" />
    </main>
  </Layout>
</template>
<style lang="scss">
  .has-column-centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
<script>
  import moment from 'moment'
  import SiteFooter from '@/components/Footer'
  import Posts from '@/components/Posts'
  import Pagination from '@/components/Pagination'
  import NavigationBack from '@/components/NavigationBack'
  import JNavbar from '@/components/JNavbar'
  export default {
    components: {
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
    }
  }

</script>

<page-query>
  query Author ($path: String!, $page: Int) {
  author (path: $path) {
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
  cover
  content
  excerpt
  description
  timeToRead
  tags {
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

<static-query>
  query {
  metadata {
  aboutAuthor
  }
  }
</static-query>
