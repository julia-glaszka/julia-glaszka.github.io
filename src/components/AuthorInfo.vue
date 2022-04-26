<template>
  <div v-if="author" class="has-text-centered">
    <div class="block">
      <figure class="image is-128x128 is-inline-block">
        <g-image class="is-rounded" src="@/assets/images/avatarLg.jpeg" :alt="author.title"/>
      </figure>
      <p class="title is-4 is-bold">
        {{ author.title }}
      </p>
      <p class="subtitle is-6">
        julia.anna.glaszka@interia.pl
      </p>
    </div>
    

    <div class="content" v-for="line in $static.metadata.shortAboutAuthor" >
        <p> {{line}} </p>
    </div>
  </div>
</template>

<script>
export default {
    props: ['author']
}
</script>

<style>

</style>
<static-query>
query {
  metadata {
    shortAboutAuthor
  }
}
</static-query>
