<template>
  <div class="container-fluid ">
    <Navbar/>
    <slot/>
    <Footer/>
  </div>
</template>

<script>
import config from '~/.temp/config.js';
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default {
  computed: {
    config () {
      return config
    }
  },
  components: {
    Navbar, 
    Footer
  }
}
</script>


