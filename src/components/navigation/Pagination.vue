<template>
  <div class="section">
    <div class="container">
      <nav role="navigation" aria-label="pagination">
        <div class="columns is-mobile">
          <div class="column">
            <g-link :to="previousPage(info.currentPage)" :class="{'is-hidden': info.currentPage == 1}"
              class="button is-rounded"
              :rel="info.currentPage == 1 ? 'nofollow' : 'prev'">
              &larr; Wstecz
            </g-link>
          </div>
          <div class="column has-text-centered">
            Strona {{ info.currentPage }} z {{ info.totalPages }}
          </div>
          <div class="column has-text-right">
            <g-link :to="nextPage(info.currentPage,info.totalPages)"
              :class="{'is-hidden': info.currentPage == info.totalPages}"
              class="button is-rounded"
              :rel="info.currentPage == info.totalPages ? 'nofollow' : 'next'">
              Następna strona &rarr;
            </g-link>
          </div>
        </div>
      </nav>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['base', 'info'],
    methods: {
      previousPage(currentPage) {
        return [0, 1].includes(currentPage - 1) ? `${this.basePath}/` : `${this.basePath}/${currentPage - 1}/`;
      },
      nextPage(currentPage, totalPages) {
        return totalPages > currentPage ? `${this.basePath}/${currentPage + 1}/` : `${this.basePath}/${currentPage}/`;
      }
    },
    computed: {
      basePath() {
        return this.base || ''
      }
    }
  }

</script>
