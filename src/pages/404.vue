<template>
  <Layout class="">
    <jNavbar/>
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
import NavigationBack from '@/components/NavigationBack'
import JNavbar from '@/components/JNavbar'
export default {
  metaInfo () {
    return {
      title: `Page Not Found (404)`,
    }
  },
  components: {
    NavigationBack,
    JNavbar
  }
}
</script>

