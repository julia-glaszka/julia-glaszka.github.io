<template>
  <span v-if="tags && tags.length > 0" class="tag is-rounded is-relative">
    <g-link :to="`${tags[0].path}/`" class="has-text-grey">
      #{{ titleCase(tags[0].title) }}
    </g-link>
  </span>
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
$primary: #ffd3b9;
.tag:before {
  transition: 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  background: $primary;
  border-radius: 9999px;
  content: " ";
}

.tag:hover:before {
    transition: 0.3s ease;
  width: 100%;
  background: $primary;
  z-index: 0;
}

.tag > * {
  z-index: 1;
}
</style>
