---
title: "Prawo Demeter - zasada ograniczenia interakcji"
slug: prawo-demeter
description: "Krótka notatka o prawie demeter z przykładami"
date: 2020-04-30 15:56:24
author: Julia
tags:
    - SOLID
    - javascript
    - TypeScript
    - programowanie
cover: /images/posts/prawo-demeter/cover.jpg


---

Przy projektowaniu obiektowym możemy się zastanowić, w jaki sposób uprościć relacje między naszymi obiektami, tak aby zmiana w jednej klasie nie propagowała konieczności zmian w wielu innych. 
Z pomocą przychodzi nam [**prawo Demeter,** ](https://pl.wikipedia.org/wiki/Prawo_Demeter "**prawo Demeter,** ")które w skrócie ogranicza nas do interakcji jedynie z najbliższymi sąsiednimi obiektami. Dzięki temu, nasz obiekt jest zależny tylko od swoich sąsiadów. Kiedy implementacja sąsiada naszego sąsiada się zmieni - nie interesuje nas to. Jest to tak zwany luźny związek (*ang. loose coupling*). 
Nie łamiemy w ten sposób zasady enkapsulacji obiektu i nie tworzymy dużej ilości powodów, dla których mielibyśmy modyfikować naszą klasę. W ten sposób możemy sprawić, że nasz projekt jest zgodny z zasadami [SOLID](https://pl.wikipedia.org/wiki/SOLID_(programowanie_obiektowe)).
Poniżej, na przykładzie logiki aplikacji quizowej, możemy przeanalizować przypadek **tight coupled** (1) i** loose coupled** (2). 


``` javascript
//// przykład tight coupling (1)
class QuizWhichBreaksLawOfDemeter {
    private questions: Question[]
    // ...
    isAnswerCorrect(question: Question) {
     // poniżej łamiemy Prawo Demeter
     // wnikając w implementację answer
      return question.getAnswer().getId() == 
      question.getUserAnswer().getId()
    } 
  
    countCorrectAnswers(): number {
      return this.questions
        .filter(q => this.isAnswerCorrect(q))
        .length
    }
  } 

// anemiczna klasa question, nic prócz getterów i setterów
 class Question {
    private answer: QuizOption
    private userAnswer: QuizOption
    // ...
    getUserAnswer(): QuizOption {
        return this.userAnswer
    }
    getAnswer(): QuizOption {
        return this.answer
    }
  } 

```

W powyższym przykładzie z poziomu quizu dostajemy się do wnętrza answer, który nie jest naszym bezpośrednim sąsiadem (quiz <-> question <-> answer). Metoda `isAnswerCorrect()` wywołuje łańcuch `question.getUserAnswer().getId()`, dostając się głęboko do struktury, której szczegółów implementacyjnych nie powinniśmy znać. Łamiemy Prawo Demeter. 

Zastanówmy się, jak możemy rozwiązać ten problem. Musimy ograniczyć splątanie naszych klas i ich wspólną zależność od siebie.
Poniżej przykład, który jest nieco lepszy. Metoda `isAnswerCorrect()` została przeniesiona z klasy Quiz, do klasy Question. Manipuluje ona już swoimi własnymi sąsiadami, wystawiając Quizowi tylko metodę do sprawdzenia ( `isAnswerCorrect()` ).

``` javascript 
// przykład loose coupling (2)
class QuizLooseCoupled {
    questions: Question[]
	// nie interesuje nas jak jest sprawdzana odpowiedź
	// po prostu wywołujemy metodę naszego sąsiedniego obiektu
     countCorrectAnswers(): number {
      return this.questions
        .filter(q => q.isAnswerCorrect())
        .length
    }
  }

  class Question {
    // ...
    private answer: QuizOption
    private userAnswer: QuizOption
    // tutaj przeniesiona jest odpowiedzialność funkcji
    isAnswerCorrect() {
      return this.answer.getId() === this.userAnswer.getId()
    } 
  } 

```
Podany przykład jest prosty. Popełnienie błędu z pierwszej sekcji nie jest fatalne w skutkach, refaktoryzacja zajmie pół minuty. W przypadku większych aplikacji z wieloma tight coupled obiektami może powstać problem, który poskutkuje efektem domina - naprawiając jeden obiekt, musimy naprawić 2,3,4 następnych…

Na ile posiadamy czasu, warto zastanowić się nad rozluznieniem wiezi naszych obiektów póki nie ma dramatu - nie żyjemy w starożytnej Grecji, ale Prawo Demeter warto znać :) 

Całość kodu można znaleźć na moim [githubie](https://github.com/evilghostgirl/law-of-demeter "githubie").
