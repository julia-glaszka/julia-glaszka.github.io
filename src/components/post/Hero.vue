<template>
  <header>
      <section class="section" :style="background_styles" style="height: 100%;">
        <div class="container">
           <slot/>
       </div>
    </section>
  
  </header>
</template>

<style lang="scss" scoped>
  img {
    margin: auto;
  }
</style>
<script>
  export default {
    props: ['backgroundUrl', 'backgroundPosition', 'overlayDisabled'],
    computed: {
      background_styles: function(){
          return {
              "background-image": this.getBackgroundImage(),
              "background-position": `${this.backgroundPosition ? this.backgroundPosition : "center"}`,
              "background-size": "cover"          }
      }
    },
    methods: {
      getBackgroundImage: function() {
        if (this.overlayDisabled) {
          return `url(${this.backgroundUrl})`;
        }
        return 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('+this.backgroundUrl+')'
      }
    }
  }

</script>
