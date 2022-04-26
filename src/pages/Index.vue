<template>
  <Layout class="bg-white">  
    <section class="section">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-half-desktop">
            <g-link to="/" class="title is-spaced ">Hey, jestem Julia i zajmuję się inżynierią oprogramowania.</g-link>

            <p class="subtitle has-padding-top-20 mb-3">💻 To mój technologiczny blog dotyczący IT.   </p>
               <p class="subtitle has-padding-top-0 mb-3"> ☕ Mam doświadczenie głównie w JVM i bazach danych NoSQL. </p>
                <p class="subtitle has-padding-top-0"> 🌿 Interesuję się zapewnianiem stabilności, skalowalności i wydajności usług.</p>
          </div>

          <div class="column is-half-desktop has-text-right has-padding-top-60-mobile is-align-items-end is-flex  is-justify-content-center is-justify-content-end-desktop	">
            <g-image class="image is-256x256" src="@/assets/images/avatarLg.jpeg" alt=""/>
          </div>
        </div>
      </div>
    </section>

    <hero :backgroundUrl="backgroundImage" :overlayDisabled="true" :backgroundPosition="'cover'">
        <div class="container pt-5">
          <div class="columns is-vcentered is-flex-wrap-wrap 	">
            <div class="column is-full ">
              <div class="title has-text-grey is-spaced">Tu mnie znajdziesz :-)</div>
            </div>
            <div class="column is-flex is-flex-direction-column	is-align-items-center	">
                <figure class="image is-128x128">
                  <g-image class="is-rounded" :src="githubAvatars.first"/>
                </figure>
                <p class="has-text-centered has-text-weight-bold pt-3">
                  <a class="has-text-grey" href="https://github.com/julia-glaszka">
                    Github prywatny
                  </a> 
                </p>   
            </div>
               <div class="column is-flex is-flex-direction-column	is-align-items-center	">
                <figure class="image is-128x128">
                  <g-image class="is-rounded" :src="githubAvatars.second"/>
                </figure>
                <p class="has-text-centered has-text-weight-bold	pt-3">
                  <a class="has-text-grey" href="https://github.com/jglaszka"> 
                    Github komercyjny
                  </a> 
                </p>   
            </div>
              <div class="column is-flex is-flex-direction-column	is-align-items-center	">
                <figure class="image is-128x128">
                  <g-image  class="is-rounded" :src="'/images/assets/devto.png'"/>
                </figure>
                <p class="has-text-centered has-text-weight-bold	pt-3">
                  <a class="has-text-grey" href="https://dev.to/evilghostgirl">
                    Dev.to
                  </a>
                </p>  
            </div>
            <div class="column is-flex is-flex-direction-column	is-align-items-center	">
                <figure class="image is-128x128">
                  <g-image  class="is-rounded" :src="'/images/assets/duolingo.png'"/>
                </figure>
                <p class="has-text-centered has-text-weight-bold	pt-3">
                 <a class="has-text-grey" href="https://www.duolingo.com/profile/evilghostgirl"> 
                    Duolingo 
                  </a>
                </p>  
            </div>
          </div>
        </div>
    </hero>

    <section class="section">
      <div class="container">
        <h2 class="title">Najnowsze Posty</h2>
        <posts :posts="$page.posts" class="has-margin-top-40"/>
      </div>
    </section>

    <pagination :info="$page.posts.pageInfo" v-if="$page.posts.pageInfo.totalPages > 1" />
  </Layout>
</template>

<script>
  import Hero from '~/components/post/Hero'

  import PostItem from '@/components/tile/PostItem'
  import Pagination from '@/components/Pagination'
  import Posts from '@/components/Posts'

  export default {
    components: {
      PostItem,
      Pagination,
      Posts,
      Hero
    },
    data() {
      return {
        backgroundImage: "/images/assets/section-background.svg",
        githubAvatars: {
          first: "https://avatars.githubusercontent.com/u/45341719?v=4",
          second: "https://avatars.githubusercontent.com/u/85160468?v=4"
        }
      }
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