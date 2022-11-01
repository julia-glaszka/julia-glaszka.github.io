<template>
    <div class="columns is-multiline">

          <large-post-item v-if="latest" :post="latest.node" class="is-spaced"/>
          <post-item v-for="(edge, index) in nextPosts" :key="edge.node.id" :post="edge.node" :index="index" class="is-spaced" :class="classNameByIndex(index)"/>
          
    </div>

     
</template>

<script>
  import PostItem from '@/components/tile/PostItem'
  import LargePostItem from '@/components/tile/LargePostItem'
 var gridset = [
    'is-half-tablet is-one-third-desktop',
    'is-half-tablet is-one-third-desktop',
    'is-half-tablet is-one-third-desktop', // row

    'is-half-tablet is-half-desktop', 
    'is-full-tablet is-half-desktop',// row
  ];

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
   },
   methods: {
    classNameByIndex(index) {
        return gridset[index % gridset.length]
    }
   }
}
</script>

<style lang="scss">

</style>
