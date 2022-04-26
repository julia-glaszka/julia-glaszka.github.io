<template>
  <Layout class="bg-white">
    <hero :backgroundUrl="$page.post.cover" class="is-halfheight">
        <div>
            <h5 class="has-text-6 is-uppercase has-text-white">
              {{ $page.post.timeToRead }} min czytania
            </h5>
            <h1 class="title is-size-2 p-t-md has-text-white">
              {{ $page.post.title }}
            </h1>
            <h2 class="subtitle p-t-md has-text-white">
              <span v-if="$page.post.author">
                <g-link :to="`${$page.post.author.path}/`" class="has-text-white">
                  {{ titleCase($page.post.author.title) }}</g-link> &bull;
              </span>
              <time :datetime="$page.post.datetime" class="capitalize">{{ formattedPublishDate }}</time>
            </h2>
            <navigation-back/>
          </div>
    </hero>
    <div class="container">
      <section class="section">
      <div class="columns mt-5"> 
        <div class="column is-three-quarters">
          <div class="container	">
            <div class="is-three-fifths-tablet post">
              <alert v-if="postIsOlderThanOneYear" class="notification">
                Ten post ma ponad rok, może być nieaktualny.
              </alert>
              <div class="content has-text-justified" v-html="$page.post.content" />
            </div>
          </div>
        </div>
        <div class="column is-one-quarter">
            <Sidebar :post="$page.post" :recommendedposts="$page.recommendedposts"/>
        </div>
      </div>
    </section>

     <div> 
<!-- do usuniecia -->

    </div>
    </div>
    
  </Layout>
</template>

<script>
  import moment from 'moment'
  import 'moment/locale/pl'
  import Alert from '@/components/Alert'
  import Hero from '~/components/post/Hero'
  import NavigationBack from '~/components/NavigationBack'
  import Sidebar from '@/components/global/Sidebar'


  export default {
    components: {
      Alert,
      Hero,
      Sidebar,
      NavigationBack
    },
    methods: {
      description(post, length, clamp) {
        if (post.description) {
          return post.description
        }

        length = length || 280
        clamp = clamp || ' ...'
        let text = post.content.replace(/<pre(.|\n)*?<\/pre>/gm, '').replace(/<[^>]+>/gm, '')

        return text.length > length ? `${ text.slice(0, length)}${clamp}` : text
      },
      titleCase(str) {
        return str.replace('-', ' ')
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')
      }
    },
    mounted() {
      import('medium-zoom').then(mediumZoom => {
        this.zoom = mediumZoom.default('.markdown p > img')
      })
    },
    computed: {
      postIsOlderThanOneYear() {
        let postDate = moment(this.$page.post.datetime)
        return moment().locale('pl').diff(postDate, 'years') > 0 ? true : false
      },
      formattedPublishDate() {
        return moment(this.$page.post.datetime).locale('pl').format('DD MMMM, YYYY');
      },
      speedFactor() {
        return this.$page.post.fullscreen ? 0.21 : 0.37
      }
    }

  }

</script>

<page-query>
  query Post ($path: String) {
    post (path: $path) {
      title
      path
      slug
      datetime: date (format: "YYYY-MM-DD HH:mm:ss")
      content
      description
      timeToRead
      cover
      author {
        id
        title
      }
      tags {
        id
        title
        path
      }
    }
    recommendedposts: allPost (limit: 3) {
        edges {
          node {
            id
            title
            path
            cover
        }
      }
    }
  }
  
</page-query>

<style>
  p >  img {
    display: block;
    margin: auto;
    margin-top: 3rem;
    box-shadow: 0 0 10px 0 rgba(59, 59, 59, 0.226);
  }
    .is-half-height {
    height: auto;
    max-height: 50vh;
    width: 100%;
    max-width: 100%;
  }
</style>

