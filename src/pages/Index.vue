<template>
  <Layout class="bg-white">  
    <section class="section hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-half-desktop">
              <p class="title is-spaced is-size-1-tablet	is-size-3-mobile	">Hey, jestem Julia i zajmuję się <i class="is-underlined">inżynierią oprogramowania.</i></p>
              <p class="subtitle has-padding-top-20 mb-3">💻 To mój personalny blog o IT i nie tylko.   </p>
              <p class="subtitle has-padding-top-0 mb-3"> ☕ Mam doświadczenie w JVM i bazach danych NoSQL. </p>
              <p class="subtitle has-padding-top-0"> 🌿 Interesuję się zapewnianiem stabilności, skalowalności i wydajności usług.</p>
            </div>

            <div class="column is-half-desktop has-text-right has-padding-top-60-mobile">
                  <g-image class="image" src="@/assets/images/hero-2.png" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section id="about" class="section has-background-black is-medium">
      <div class="container">
        <div class="columns">
          <div class="column is-half-desktop">
            <h2 class="title section-title has-text-grey is-size-5">Poznajmy się</h2>
            <p class="pb-2">
              Jestem Julia i zawodowo pracuję jako Software Engineer od 2020. Wcześniej chodziłam do technikum informatycznego, podczas którego rozwinęła się moja pasja i uczyłam się na własną rękę.
              
            </p>
            <p class="pb-2">
              Mam doświadczenie w JVM i bazach danych NoSQL, wśród moich obowiązków w pracy było zapewnianie stabilności, skalowalności i wydajności usług. 
            </p>
            <p class="pb-2">
              Lubię gdy kod jest zadbany, prosty i czytelny - nie popieram przekombinowania w imię "czystego kodu".
            </p>
          </div>
          
          <div class="column is-half-desktop">
            <h2 class="title section-title is-size-5 has-text-grey ">Jaki był cel utworzenia tego bloga?</h2>
            <p class="pb-2">
              Założyłam tego bloga, aby móc spisywać swoje przemyślenia, nabytą wiedzę i pomysły. 
              Moim celem jest tworzenie przydatnej treści, a nie powielanie klikalnych buzzwordów. 
              Chciałabym też pokazywać, że nie trzeba mieć ukończonych studiów ani płacić za kursy, aby być dobrym inżynierem IT.
            </p>  
            <p class="pb-2">
              W technologii utrzymywanie wysokiej jakości jest niezwykle ważne - dlatego chcę zachęcać by nie poprzestawać na efekcie "byle działało" - co niestety jest patologią branży. 
              Software development nie zawsze jest taki kolorowy, jak mówią w reklamach i artykułach.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="posts" class="section is-medium">
      <div class="container">
        <h2 class="title section-title has-text-centered">Może zainteresują Cię moje <i class="is-underlined">najnowsze wpisy</i>?</h2>
        <posts :posts="$page.posts" class="has-margin-top-40"/>
      </div>
      <pagination class="has-margin-top-40" :info="$page.posts.pageInfo" v-if="$page.posts.pageInfo.totalPages > 1" />
    </section>


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
        backgroundImage: "/images/assets/section-background.svg"
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

<style lang="scss">
  .card-image > a >.g-image {
    width: 100%;
  }

  .navbar-brand {
    justify-content: center;
  }

</style>