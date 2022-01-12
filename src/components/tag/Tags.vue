<template>
  <div v-if="tags && tags.length > 0" class="tags ">
    <g-link :to="`${tag.path}/`" class="tag is-blue is-rounded is-outlined has-text-grey" v-for="(tag) in tags" >
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

<style lang="scss" scoped>
  .is-blue {
    background: #d9e5ff;
  }
</style>