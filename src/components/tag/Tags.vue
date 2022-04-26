<template>
  <div class="tags" v-if="tags && tags.length > 0">
    <g-link :to="`${tag.path}/`" :key="index" class="tag is-link is-rounded" v-for="(tag, index) in tags" >
      #{{ titleCase(tag.title) }}
    </g-link>
  </div>
</template>

<script>
  export default {
    props: ['tags'],
    methods: {
      titleCase(str) {
        return str.replace('-', ' ')
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')
      }
    }
  }
</script>
