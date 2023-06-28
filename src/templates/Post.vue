<template>
  <Layout>

    <div class="container pb-6">
      <section class="section">
        <div class="columns mt-5">
          <div class="column is-three-quarters">
            <div class="container	">
              <div class="is-three-fifths-tablet post">
                <!-- navigation -->
                <navigation-back class="mb-6"/>

                <!-- metadata -->
                <div class="post-metadata mb-6">
                  <h1 class="title is-size-2 p-t-md pb-2">
                    {{ $page.post.title }}
                  </h1>
                  <h2 class="subtitle p-t-md has-text-white">
                    <span v-if="$page.post.author">
                      <g-link :to="`${$page.post.author.path}/`">
                        {{ titleCase($page.post.author.title) }}</g-link> &bull;
                    </span>
                    <time :datetime="$page.post.datetime" class="capitalize">{{ formattedPublishDate }}</time>
                  </h2>
                </div>

                <!-- post content -->
                <div class="content has-text-justified-desktop" v-html="$page.post.content" />
              </div>
            </div>
          </div>
          <div class="column is-one-quarter">
            <Sidebar :post="$page.post" :recommendedposts="$page.recommendedposts" />
          </div>
        </div>
      </section>
      <div>
      </div>
      <hr>
    </div>

  </Layout>
</template>

<script>
  import moment from 'moment'
  import 'moment/locale/pl'
  import NavigationBack from '~/components/navigation/NavigationBack'
  import Sidebar from '@/components/sidebar/Sidebar'


  export default {
    components: {
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
      formattedPublishDate() {
        return moment(this.$page.post.datetime).locale('pl').format('DD MMMM, YYYY');
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
  p>img {
    display: block;
    margin: auto;
    margin-top: 3rem;
    box-shadow: 0 0 10px 0 rgba(59, 59, 59, 0.226);
  }

</style>
