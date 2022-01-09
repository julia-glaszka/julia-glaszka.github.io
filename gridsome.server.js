module.exports = function (api) {
  api.loadSource(async store => {
    store.addMetadata('aboutAuthor', [`Pasjonuję się IT, ekonomią i muzyką. 
    Swoje pierwsze kroki zaczęłam w frontendzie (a kto nie zaczął?) - w 2016 roku, później też zajmowałam się amatorsko designem, ale szybko odkryłam, że to raczej nie było to, co chcę robić w życiu. `,
    `Od 2019 zaczęłam uczyć się backendu, systemów, baz danych NoSQL i zarządzania infrastrukturą - głównie przez to, 
    że strasznie podobaja mi się idea mikroserwisów i chcę umieć projektować wydajne architektury na potrzeby różnych case'ów biznesowych.`,
    `Moim ulubionym językiem jest Java i w niej pracuję na codzień, umiem też kodzić w Javascript'cie, w Kotlinie, Groovym, Golangu (i w paru innych językach).`,  
    `Z prywatnych rzeczy: uwielbiam ekonomię i finanse, muzykę, sztukę. Mam dwa króliki miniaturki i kocham góry. Ostatnio zafascynowałam się krajami Bałkanami. 
    Raczej introwertyk, mimo to nie mam problemów z pracą zespołową czy komunikacją. :) Na bloga wrzucam rzeczy, na których napisanie akurat miałam ochotę i uznałam, że warto się podzielić taką wiedzą. `])
    store.addMetadata('shortAboutAuthor', [`Pasjonuję się IT, ekonomią i muzyką. 
    Od 2019 siedzę z tyłu, bawiąc się backendem, systemami i infrastrukturą - głównie przez to, 
    że strasznie podobaja mi się idea mikroserwisów i chciałabym umieć zaprojektować wydajną architekturę na potrzeby różnych case'ów biznesowych.
    Moim ulubionym językiem jest Java i w niej pracuję na codzień, umiem też kodzić w Javascript'cie, w Kotlinie, Groovym, Golangu (i w paru innych językach).` 
    ])
  })
}
