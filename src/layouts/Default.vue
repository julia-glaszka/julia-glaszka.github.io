<template>
  <div> 

    <Navbar/>

    <slot/>

    

 
    <div class="columns"> 
      <div class="column is-full"> 
        <Footer/>
      </div>
    </div>
  </div>

</template>

<script>
import config from '~/.temp/config.js';
import Footer from '@/components/global/Footer'
import Navbar from '@/components/global/Navbar'

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


