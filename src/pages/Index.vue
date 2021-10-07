<template>
  <Layout class="bg-white">
    <jNavbar/>
    <section class="section">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-half-desktop">
            <g-link to="/" class="title is-spaced ">Hey, jestem Julia i zajmuję się inżynierią oprogramowania.</g-link>

            <p class="subtitle has-padding-top-20 mb-3">💻 To mój technologiczny blog dotyczący różnych dziedzin IT.   </p>
               <p class="subtitle has-padding-top-0 mb-3"> ☕ Mam doświadczenie głównie w JVM i bazach danych. </p>
                <p class="subtitle has-padding-top-0"> 🌿 Interesuję się zapewnianiem stabilności, skalowalności i wydajności usług.</p>
            <g-link to="/author/Julia" class="button is-primary is-rounded" >O mnie</g-link>
          </div>
          <div class="column is-half-desktop has-text-right has-padding-top-60-mobile is-align-items-end is-flex  is-justify-content-center is-justify-content-end-desktop	">
            <g-image class="image is-256x256" src="@/assets/images/avatarLg.jpeg" alt=""/>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <hr>
    </div>


    <main class="section">
      <section class="container">
        <h2 class="title has-text-centered">Najnowsze Posty</h2>
        <!-- all posts -->
        <posts :posts="$page.posts" class="has-margin-top-40"/>
        <!-- all posts end -->
      </section>
    </main>

       <pagination :info="$page.posts.pageInfo" v-if="$page.posts.pageInfo.totalPages > 1" />


        <site-footer/>

  </Layout>
</template>

<script>
  import SiteFooter from '@/components/Footer'
  import PostItem from '@/components/PostItem'
  import Pagination from '@/components/Pagination'
  import Posts from '@/components/Posts'
  import JNavbar from '@/components/JNavbar'

  export default {
    components: {
      PostItem,
      Pagination,
      SiteFooter,
      Posts,
      JNavbar
    },
    metaInfo() {
      return {
        title: this.$static.metadata.siteName,
        avatar: this.$static.metadata.avatarLg
      }
    }
  }

</script>

<page-query>
  query Home ($page: Int) {
    posts: allPost (page: $page, perPage: 6) @paginate {
      totalCount
        pageInfo {
          totalPages
          currentPage
        }
        edges {
          node {
            id
            title
            timeToRead
            datetime: date (format: "YYYY-MM-DD HH:mm:ss")
            content
            excerpt
            description
            path
            cover
            tags {
              id
              title
              path
            }
            author {
              id
              title
              path
          }
        }
      }
    }
  }
</page-query>

<static-query>
  query {
    metadata {
    siteName
    siteUrl
    siteDescription
    }
  }
</static-query>
<style> 
.card-image > a >.g-image {
  width: 100%;
}

.navbar-brand {
  justify-content: center;
}

</style>