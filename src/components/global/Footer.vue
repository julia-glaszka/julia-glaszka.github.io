<template>
  <footer id="contact" class="footer has-background-black p-t-xl">
    <div class="container">
      <div class="columns">
        <div class="column has-text-left">
          <a class="title is-4 has-text-grey section-title" href="#">Blog Julii Glaszka</a> 
          <p class="pt-5">
            Założyłam tego bloga, aby móc spisywać swoje przemyślenia, nabytą wiedzę i pomysły. 
            Moim celem jest tworzenie przydatnej treści, a nie powielanie klikalnych buzzwordów. 
            Chciałabym też pokazywać, że nie trzeba mieć ukończonych studiów ani płacić za kursy, aby być dobrym inżynierem IT.
          </p>

          <h5 class="title is-5 pt-5 has-text-grey">#cytaty</h5>
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
         
          <p class="pt-5">
            e-mail: julia.anna.glaszka@interia.pl
          </p>
        </div>
    

        <div class="column is-half has-text-left">
          <div class="title is-4 section-title has-text-grey">Kontakt</div>   
          <div class="tile is-ancestor">
            <div class="tile is-4 is-vertical is-parent">
              <div class="tile is-child box">
                <a href="'https://github.com/julia-glaszka'">GITHUB #1</a>
              </div>
              <div class="tile is-child box has-background-dark">
                <a href="'https://github.com/jglaszka'">GITHUB #2</a>
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile is-child box has-background-dark"  background="/images/lemons.jpg">
                <a href="'https://dev.to/evilghostgirl'">DEV.TO</a>
              </div>
            </div>
             <div class="tile is-parent">
              <div class="tile is-child box has-background-dark"  background="/images/lemons.jpg">
                <a href="'https://dev.to/evilghostgirl'">LINKEDIN</a>
              </div>
            </div>
          </div>
          <div class="tile is-ancestor">
            <div class="tile is-6 is-vertical is-parent">
              <div class="tile is-child box has-background-dark">
                <a href="'https://www.duolingo.com/profile/evilghostgirl'">DUOLINGO</a>
              </div>
            </div>
             <div class="tile is-6 is-vertical is-parent">
              <div class="tile is-child box has-background-dark">
                <a href="mailto:julia.anna.glaszka@interia.pl"> EMAIL</a>
              </div>
            </div>
          </div>
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
  color: black;
    font-weight: bold;
    letter-spacing: 2px;
    background-color: #e6e6e6;
    font-size: larger;
 }
</style>
