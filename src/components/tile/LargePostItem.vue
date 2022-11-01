<template>
  <div v-if="post" class="column is-full">
    <!-- Card start -->
    <div class="card is-flex-direction-row-tablet" style="height: 100%">

      <div class="card-image column p-0 is-half" v-if="post.cover">
        <g-link :to="`${post.path}/`">
          <g-image :src="post.cover" alt="Miniaturka posta" />
        </g-link>
      </div>
      <div class="card-image column p-0 is-half" v-else>
        <g-link :to="`${post.path}/`">
          <g-image src="@/assets/images/no-image.jpg" alt="Brak zdjęcia" />
        </g-link>
      </div>
      <div class="card-content is-one-third is-flex-direction-column is-align-self-flex-end pb-0">

        <h5 class="title is-size-5 has-padding-bottom-10 ">
          <g-link :to="`${post.path}/`">{{post.title}}</g-link>
        </h5>

        <div class="subtitle is-size-6 has-text-grey	">


          <!-- tags -->
          <post-tags :tags="post.tags"/>
          <!-- dot -->

        </div>

        <p class="has-text-grey	 is-size-6"  v-if="post.description"> {{post.description}}</p>
        <div class=" post-info-box">
          <div class="is-pulled-left has-padding-right-10">
            <figure class="image is-48x48" v-if="post.author">
              <g-image class="is-rounded" src="@/assets/images/profile-picture-avatar.png" alt="X" />
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
              <time :datetime="post.datetime" class="">{{ formatPublishDate(post.datetime) }}</time>
              <span v-if="post.author || (post.tags && post.tags.length > 0)"> · </span>
              <span>{{ post.timeToRead }} min</span>
            </div>

          </div>
        </div>
        <footer class="card-footer">
          <g-link :to="`${post.path}/`" class="card-footer-item">Przeczytaj</g-link>
        </footer>
      </div>

      <!-- Card end -->
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import 'moment/locale/pl'

  import PostTags from '@/components/tag/Tags'
  export default {
    props: ['post'],
    components: { PostTags },
    computed: {
      formattedPublishDate() {
        return moment(this.post.datetime).locale('pl').format('DD MMMM, YYYY');
      }
    },
    methods: {
      formatPublishDate(date) {
        return moment(date).locale('pl').format('DD MMMM, YYYY');
      },
      titleCase(str) {
        return str.replace('-', ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
      }
    },
  }

</script>
