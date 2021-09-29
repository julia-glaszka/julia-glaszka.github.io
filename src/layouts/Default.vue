<template>
  <div class="container-fluid ">
    <slot/>
  </div>
</template>

<script>
import config from '~/.temp/config.js';

export default {
  computed: {
    config () {
      return config
    }
  }
}
</script>


