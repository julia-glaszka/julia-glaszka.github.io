<template>
  <section class="sidebar">
    <div class="block">
      <author-info :author="post.author"/>
    </div>
    <hr/>
    <div v-if="post.tags" class="block has-text-centered">
      <p class="title is-4"> Tagi </p>
      <post-tags :tags="post.tags" class="is-justify-content-center"/>
    </div>
    <hr/>
    <div class="block">
      <p class="title is-5 has-text-centered"> Najnowsze posty</p>
      <recomendations-post-item v-for="(edge, index) in recommendedposts.edges" :key="index" :post="edge.node"/>
    </div>
  </section>
</template>

<style lang="scss">

.sidebar {
  font-size: 16px;
}

.sidebar .card-content {
  padding: 0.5rem 1rem !important;
}

.sidebar .card-content .title {
  font-size: 1.2rem !important;
}

 .sidebar .card-footer-item {
  font-size: 0.9em !important;
}


</style>
<script>
  import AuthorInfo from '@/components/sidebar/AuthorInfo'
  import RecomendationsPostItem from '@/components/post/tile/RecomendationsPostItem'

  export default {
    name: 'Sidebar',
    props: ['post', 'recommendedposts'],
    components: {
      AuthorInfo,
      RecomendationsPostItem
    }
  }

</script>