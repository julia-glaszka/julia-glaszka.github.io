<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item has-text-weight-semibold" href="/">Julia Glaszka</a>
      <div class="navbar-burger" @click="nav_active = !nav_active">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': nav_active }">
      <div class="navbar-end">
        <g-link  class="navbar-item" :to="'/#about'">
          O mnie
        </g-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Tematy
          </a>
          <div class="navbar-dropdown is-boxed">
            <g-link  class="navbar-item" :to="'tag/java/'">
              #java
            </g-link>

            <g-link  class="navbar-item" :to="'tag/database/'">
              #database
            </g-link>

            <g-link  class="navbar-item" :to="'tag/design/'">
              #design
            </g-link>

            <g-link  class="navbar-item" :to="'tag/inżynieria/'">
              #inżynieria
            </g-link>

            <g-link  class="navbar-item" :to="'tag/soft%20skills/'">
              #soft_skills
            </g-link>
          </div>
        </div>
        <g-link  class="navbar-item" :to="'/#posts'">
          Najnowsze wpisy
        </g-link>
        <div class="navbar-item">
          <g-link  class="button is-rounded" :to="'/#contact'">
            Kontakt
          </g-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        nav_active: false
      }
    }
  }
</script>