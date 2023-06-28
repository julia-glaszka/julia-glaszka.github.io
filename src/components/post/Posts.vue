<template>
    <div class="columns is-multiline">
          <post-tile v-for="(edge, index) in posts.edges" :key="edge.node.id" :post="edge.node" :index="index" class="is-spaced mb-6"/>  
    </div>
</template>

<script>
  import PostTile from '@/components/post/tile/PostTile'

export default {
   props: ['posts'],
   components: {
    PostTile
   }
}
</script>