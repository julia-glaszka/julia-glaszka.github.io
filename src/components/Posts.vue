<template>
    <div class="columns is-multiline">

          <large-post-item v-if="latest" :post="latest.node"/>
          <post-item v-for="(edge, index) in nextPosts" :key="edge.node.id" :post="edge.node" :index="index"/>
          
    </div>

     
</template>

<script>
  import PostItem from '@/components/PostItem'
  import LargePostItem from '@/components/LargePostItem'

export default {
   props: ['posts'],
   components: {
     PostItem,
     LargePostItem
   },
   computed: {
     latest: function() {
       return this.posts.edges.length > 3 ? this.posts.edges[0] : {};
     },
     nextPosts: function() {
       return this.posts.edges.length > 3 ? this.posts.edges.slice(1) : this.posts.edges;
     }
   }
}
</script>

<style>

</style>
