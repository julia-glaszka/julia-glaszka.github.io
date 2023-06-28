<template>
  <footer id="contact" class="p-t-xl">
    <div class="container">
      <div class="columns">
        <div class="column has-text-left">
          <a class="title is-4 section-title" href="#">Blog Julii Glaszka</a> 
          <p class="pt-5">
            Założyłam tego bloga, aby móc spisywać swoje przemyślenia, nabytą wiedzę i pomysły. 
            Moim celem jest tworzenie przydatnej treści, a nie powielanie klikalnych buzzwordów. 
            Chciałabym też pokazywać, że nie trzeba mieć ukończonych studiów ani płacić za kursy, aby być dobrym inżynierem IT.
          </p>
          <h5 class="title is-5 pt-5">#cytaty</h5>
          <p class="is-family-monospace">
            Either life entails courage, or it ceases to be life.
            ~ E. M. Forster
          </p>
          <p class="pt-5 is-family-monospace"> 
            <i>
              Wynalazca to człowiek, który pyta wszechświat: "Dlaczego?" 
              i nie pozwala,
              by cokolwiek stanęło między odpowiedzią 
              a jego umysłem. ~ "Atlas Shrugged", Ayn Rand
            </i>
          </p>
        </div>
    

        <div class="column is-half has-text-left">
          <div class="title is-4 section-title">Kontakt</div>   
          <div class="tile is-ancestor">
            <div class="tile is-4 is-vertical is-parent">
              <div class="tile is-child box">
                <a href="'https://github.com/julia-glaszka'" class="has-text-white">GITHUB #1</a>
              </div>
              <div class="tile is-child box">
                <a href="'https://github.com/jglaszka'" class="has-text-white">GITHUB #2</a>
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile is-child box" background="/images/lemons.jpg">
                <a href="'https://dev.to/evilghostgirl'" class="has-text-white">DEV.TO</a>
              </div>
            </div>
             <div class="tile is-parent">
              <div class="tile is-child box" background="/images/lemons.jpg">
                <a href="'https://dev.to/evilghostgirl'" class="has-text-white">LINKEDIN</a>
              </div>
            </div>
          </div>
          <p class="pt-5">
            e-mail: julia.anna.glaszka@interia.pl
          </p>
        </div>
      </div>

      <div class="columns">
         <div class="column has-text-centered has-text-right-tablet">
          <p class="subtitle is-5"><span class="copyleft">&copy;</span> juliagl</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

  export default {
    name: 'Footer'
  }

</script>

<style>
  .copyleft {
    display: inline-block;
    transform: rotate(180deg);
  }

 .tile.box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("/images/assets/lemons.jpg");
    transition: 0.3s ease;
    -webkit-filter: brightness(50%);
 }

 .tile.box:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("/images/assets/lemons.jpg");
    -webkit-filter: brightness(100%) ;
 }

 .tile.box a {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: larger;
 }
</style>
