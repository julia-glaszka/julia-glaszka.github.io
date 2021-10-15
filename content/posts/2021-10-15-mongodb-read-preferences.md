---
title: "Wykorzystaj cały potencjał klastra MongoDB z pomocą preferencji odczytu"
slug: mongodb-read-preferences
description: "Wykorzystaj cały potencjał klastra MongoDB z pomocą preferencji odczytu"
date: 2021-10-15 18:37:24
author: Julia
tags:
    - mongodb
    - java
    - data
    - database
cover: /images/posts/mongodb-read-preferences/route.jpg


---

# 

Typowy produkcyjny klaster jest zbudowany z co najmniej jednego ReplicaSetu. To oznacza, że posiadamy co najmniej jeden węzeł Primary (realizujący zapisy i odczyty) i kilka Secondary (tylko do odczytu). Domyślne ustawienia konfiguracji sterowników kierują ruch wyłącznie do Primary, rezygnując z używania pozostałych hostów. To oznacza, że obciążony jest tylko jeden node, a reszta pozostaje bierna - zasoby pod względem load-balancingu są marnowane. W przypadku awarii Mastera tracimy też możliwość odczytów, które mogłyby być nadal realizowane przez Secondary.

Zatem w jaki sposób można wymusić kierowanie ruchu do innych hostów niż Primary? Z pomocą przychodzą nam preferencje odczytu - tzw. `ReadPreference`. Posiada on różne tryby, pozwalające na wybranie algorytmu poszukiwania hosta, do którego wyślemy query.

## Konfiguracja preferencji odczytu w driverze

Ustawienia `ReadPreference` można zdefiniować w kilku miejscach:

  

-   na poziomie klastra:
    
``` java
MongoClient mongoClient = MongoClients.create(MongoClientSettings.builder()  
.hosts(listOfHostsUrls)
.readPreference(ReadPreference.secondary())  
.build());
```
  

-   na poziomie bazy danych
    
``` java
MongoDatabase database = mongoClient.getDatabase("someDatabase")  
.withReadPreference(ReadPreference.secondary());
```
  

-   na poziomie kolekcji
    
``` java
MongoCollection<Document> collection = database.getCollection("videos")  
.withReadPreference(ReadPreference.secondary());
```
  

Podane ustawienia mogą zmieniać działanie usługi, jeśli na przykład posiada na klastrze kilka różnych baz danych z różnymi kolekcjami. Może być tak, że nie dla wszystkich kolekcji można sobie pozwolić na odczyt z Secondary - np. gdy potrzebujemy wyższy poziom consistency.

## Tryby odczytu

### primary

Domyślny dla wielu driverów. Kieruje ruch wyłącznie do hosta typu Primary, co może być znaczącą barierą w skalowaniu usługi pod kątem odczytów.

### primaryPreferred

W tej preferencji w głównej mierze odczytujemy z hosta Primary, ale w przypadku gdy będzie niedostępny to odczyty zostaną przekierowana do innych replik typu Secondary.

### secondary

Wszystkie odczyty są kierowane do Secondary.

### secondaryPreferred

W większości przypadków odczytujemy z Secondary, ale przy awarii wszystkich hostów ruch może zostać przekierowany do Primary.

### nearest

Driver selekcjonuje zdrowe hosty z odpowiednio krótkim czasem odpowiedzi, tak by odpowiedziały maksymalnie szybko - np w ramach jednego datacenter. Następnie losowo wybierany jest jeden host, który zrealizuje żądanie. Nie jest uwzględniane czy node jest Primary czy Secondary.

## Jaki tryb odczytu wybrać?

W przypadku usługi typu heavy read z eventual consistency najbardziej optymalne będzie odczytywanie z preferencjami: `nearest`, `secondaryPreferred` lub `secondary`. Wybór konkretnej preferencji zależałby w tym przypadku od ilości zapisów oraz posiadanych hostów i zasobów. Jeśli usługa bardzo dużo zapisuje i Primary jest już dostatecznie obciążony, można rozważyć unikanie dociążania Primary poprzez preferencję `secondary` lub `secondaryPreferred`.

Ostateczny wybór między pozostałymi dwoma typami odczytów może rozstrzygnąć to - czy bardziej zależy nam na stabilności odczytów czy zapisów. SecondaryPreferred dostarcza n+1 hostów, natomiast samo secondary tylko n (bo nie uwzględnia Primary).

W sytuacji niespodziewanie większego ruchu warto mieć więcej dostępnych hostów niż mniej, ale analizując z drugiej strony - ten jeden dodatkowy host to Primary, jeśli zostanie obciążony to doprowadzi to również do niestabilności zapisów. Jeśli usługa nie posiada mechanizmów ponowień takich jak klienci z ponowieniami lub message queue, to dane mogą zostać niezapisane, co skłaniałoby do użycia preferencji secondary - wtedy awaria dotyczyłaby tylko odczytów.


## Po wdrożeniu

Po wdrożeniu nowego typu preferencji warto mieć wgląd w metryki:

-   czasów odpowiedzi usługi
    
-   czasów odpowiedzi bazy danych do usługi
    
-   load, zajętość ramu, ilość rps do kolekcji, obciążenie sieciowe klastra mongo

## Podsumowanie

Jak widać, każde takie ustawienie trzeba samodzielnie przeanalizować, uwzględniając swoje własne wymagania względem stabilności. Wybranie konkretnej preferencji odczytu może mieć dalekosiężne skutki, dlatego przed wyborem zawsze warto się dłużej zastanowić i przeanalizować słabe punkty konkretnego rozwiązania. Polecam również zapoznać się z [oficjalną dokumentacją](https://docs.mongodb.com/manual/core/read-preference/).