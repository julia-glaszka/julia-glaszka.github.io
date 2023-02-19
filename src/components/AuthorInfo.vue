<template>
  <div v-if="author" class="has-text-centered">
    <div class="block sidebar-author-info">
      <figure class="image is-128x128 is-inline-block">
        <g-image class="is-rounded" src="@/assets/images/profile-picture-avatar.png" :alt="author.title"/>
      </figure>
      <p class="title is-4 is-bold pt-5">
        {{ author.title }}
      </p>
      <p class="subtitle is-7">
        {{ $static.metadata.email }}
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
 .sidebar-author-info {
    display: flex;
    flex-direction: column;
    align-items: center;
 }
</style>
<static-query>
query {
  metadata {
    shortAboutAuthor,
    email
  }
}
</static-query>
