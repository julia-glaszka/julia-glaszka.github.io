<template>
  <div class="card" v-if="author">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
      <figure class="image is-48x48">
        <g-link :to="`${author.path}/`">
          <g-image class="is-rounded" src="@/assets/images/avatarLg.jpeg" :alt="author.title"/>
        </g-link>
      </figure>
      </div>
      <div class="media-content">
        <p class="title is-4"> <g-link :to="`${author.path}/`"
            class="">
            {{ author.title }}</g-link></p>
        <p class="subtitle is-6">julia.anna.glaszka@interia.pl</p>
      </div>
    </div>

    <div class="content" v-for="line in $static.metadata.shortAboutAuthor" >
        <p> {{line}} </p>
    </div>
  </div>
    <footer class="card-footer">
    <g-link :to="`${author.path}/`" class="card-footer-item">
            See all posts by {{ author.title }} &rarr;</g-link>
  </footer>
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
