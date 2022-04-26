<template>
  <div class="column" >
    <!-- Card start -->
    <div class="card" style="height: 100%">

      <div class="card-image p-0" v-if="post.cover">
        <g-link :to="`${post.path}/`">
          <g-image :src="post.cover" alt="Post cover photo"/>
        </g-link>
      </div>
      <div class="card-image p-0" v-else>
        <g-link :to="`${post.path}/`">
          <g-image src="@/assets/images/no-image.jpg" alt="No photo"/>
        </g-link>
      </div>
      <div class="card-content">

        <h5 class="title is-size-4 has-padding-bottom-10 ">
          <g-link :to="`${post.path}/`">{{post.title}}</g-link>
        </h5>

        <div class="subtitle is-size-6 has-text-grey"  v-if="post.tags">


          <!-- tags -->
         <post-tags :tags="post.tags"/>
          <!-- dot -->

        </div>

        <p class="has-text-grey	 is-size-6" v-html="excerpt(post, 180, ' ...')"  v-if="post.content"></p>
      </div>
      <div class="card-content pt-0	post-info-box" v-if="!shouldHidePostMetadata">
          <div class="is-pulled-left has-padding-right-10">
            <figure class="image is-48x48" v-if="post.author">
              <g-image class="is-rounded" src="@/assets/images/avatarLg.jpeg"  alt="X"/>
            </figure>
          </div>

          <div class="content is-pulled-left">
            <span v-if="post.author">
              <span class="has-text-grey-darker">
                {{ titleCase(post.author.title) }}
              </span>
              <br>
            </span>
            <div class="has-text-grey-light">
              <time v-if="post.datetime" :datetime="post.datetime" class="">{{ formatPublishDate(post.datetime) }}</time>
              <span v-if="post.author || (post.tags && post.tags.length > 0)"> · </span>
              <span v-if="post.timeToRead">{{ post.timeToRead }} min</span>
            </div>

          </div>
      </div>
      <footer class="card-footer">
        <g-link :to="`${post.path}/`" class="card-footer-item">Przeczytaj</g-link>
      </footer>
      <!-- Card end -->
    </div>
  </div>
</template>
<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    border-radius: 15px;
  }


</style>
<script>
  import moment from 'moment'
  import 'moment/locale/pl'
  import PostTags from '@/components/tag/Tags'
 

  export default {
    components: { PostTags },
    props: ['post', 'index'],
    computed: {
      formattedPublishDate() {
        return moment(this.post.datetime).locale('pl').format('DD MMMM, YYYY');
      },
     
      shouldHidePostMetadata() {
        return !this.post || (!this.post.author && !this.post.datetime && !this.post.timeToRead && !this.post.tags)
      }
    },
    methods: {
      formatPublishDate(date) {
        return moment(date).locale('pl').format('DD MMMM, YYYY');
      },
      excerpt(post, length, clamp) {
        if (post.excerpt) {
          return post.excerpt
        }

        length = length || 180
        clamp = clamp || ' ...'
        let text = post.content.replace(/<pre(.|\n)*?<\/pre>/gm, '').replace(/<[^>]+>/gm, '')

        return text.length > length ? `${ text.slice(0, length)}${clamp}` : text
      },
      titleCase(str) {
        return str.replace('-', ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
      }
    },
  }

</script>
