<template>
  <footer class="footer has-background-primary p-t-xl">
    <div class="container">
      <div class="columns">
        <div class="column has-text-left">
          <a class="title is-4 has-text-grey" href="#">Autodydaktycznie Blog</a> <br />
          <p class="pt-5"> 
              Wynalazca to człowiek, który pyta wszechświat: "Dlaczego?" 
              i nie pozwala,
              by cokolwiek stanęło między odpowiedzią 
              a jego umysłem. ~ "Atlas Shrugged", Ayn Rand</p>
          <p class="pt-5">
            <g-link class="has-text-grey" to="/author/Julia">O Autorce</g-link>
          </p>
          <p class="pt-1">
            <g-link class="has-text-grey mt-5" to="https://www.linkedin.com/in/julia-glaszka/">LinkedIn</g-link>
          </p>
        </div>
        <div class="column has-text-centered has-text-right-tablet">
          <p class="subtitle is-5"><span class="copyleft">&copy;</span> juliagl</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
  }

</script>

<style>
  .copyleft {
    display: inline-block;
    transform: rotate(180deg);
  }

</style>
