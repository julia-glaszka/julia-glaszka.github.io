<template>
  <Layout class="">
    <section class="hero is-fullheight">
      <navigation-back/>
      <div class="hero-body  has-text-centered">
        <div class="container">
          <h1 class="title is-size-1">Błąd 404</h1>
          <h2 class="subtitle is-size-3">Chyba się zgubiłeś :(</h2>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import NavigationBack from '@/components/navigation/NavigationBack'
export default {
  metaInfo () {
    return {
      title: `Strona nie znaleziona (404)`,
    }
  },
  components: {
    NavigationBack
  }
}
</script>

