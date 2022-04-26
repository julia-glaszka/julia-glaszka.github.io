---
title: "Konfiguracja ClusterSettings w MongoDB Java Driver"
slug: mongodb-java-driver-cluster-settings-properties
description: "Konfiguracja ClusterSettings w MongoDB Java Driver"
date: 2021-10-07 20:22:24
author: Julia Glaszka
tags:
    - mongodb
    - java
    - data
    - database
cover: /images/posts/cluster-settings-mongo/local-threshold.png


---

Powszechnie wykorzystywane klienty do łączenia się z bazą danych dostarczają wiele funkcjonalności i możliwości konfiguracji, które można przeoczyć - a są bardzo przydatne i mogą zoptymalizować działanie usługi. Warto poznać parę przydatnych settingsów, które potencjalnie można przetestować.

### Czym są drivery?

Drivery działają z reguły w taki sposób, że zarządzają połączeniami otwieranymi do bazy danych, dostarczając przydatne funkcje i logikę - na przykład ograniczeniem puli połączeń czy eliminacji gorzej działających hostów. Owrapowują całą logikę w przyjazny interfejs api, odciążając programistę od rozumienia internali Takich rzeczy raczej nie opłaca się implementować samemu od zera, ale nie oznacza to że jest to niewykonalne. Są różne drivery i można nawet do nich kontrybuować, bo w większości przypadków są open-source.

### ClusterSettings

Klaster to grupa hostów mongo, które udostępniają razem pewien zbiór danych, składa się z shardów (opcjonalnie), config serverów i replica setów. Ustawienia dotyczące klastra można skonfigurować za pomocą klasy `ClusterSettings`, która zawiera takie modyfikowalne elementy jak lista hostów, do których chcemy się łączyć, nazwa replicasetu, różne polityki wybierania hostów, którego wykorzystamy do wysłania zapytania do bazy.

### localThreshold
Umożliwia sterownikowi wybrać hosty, które mają najszybszy czas odpowiedzi i są na maszynach fizycznych w najbliższej możliwej lokalizacji - na przykład w ramach jednego datacenter. Parametr `localTreshold` to próg czasu, który zaczyna być odliczany od momentu uzyskania najszybszej odpowiedzi z serwera mongo. Wszystkie hosty, które odpowiedzą w zadanym okresie (ping najszybszego serwera + czas local threshold) zostaną zakwalifikowane do wykonywania żądań do bazy. Najlepiej obrazuje to rysunek:

![Wizualizacja Local Threshold](/images/posts/cluster-settings-mongo/local-threshold.png "Wizualizacja Local Threshold")

Przykładowo: istnieją 3 serwery mongod, które odpowiadają w czasie `5ms`, `9ms` i `27ms`. Ustawiono na sterowniku `localThreshold=20ms`. Jako że najszybszy czas odpowiedzi to 5ms, a jeszcze do niego należy doliczyć zdefiniowany threshold czyli `20ms`, to łącznie maksymalny czas odpowiedzi wyniesie `25ms`. Serwer odpowiadający w czasie 9ms zakwalifikuje się do serwowania danych, natomiast serwer któremu odpowiedź zajęła `27ms` zostaje odrzucony - ponieważ akceptowano czas maksymalny `25ms`. 

Jeśli zostanie utracona łączność z serwerem, który wcześniej odpowiadał w `5ms`, a zostaną nam dwa serwery z `9ms` i `27ms`, to wybierzemy oba, ponieważ local threshold się przesunął (`9ms + 20ms = 29ms`).

Na dopasowanie tego parametru nie ma uniwersalnego wzoru i trzeba go skonfigurować zgodnie z realnymi czasami z własnych dc, przydatne mogą być w tym celu metryki czasów odpowiedzi. Raczej nie ma większego powodu, by w normalnym trybie działania aplikacji odpytywać nie-lokalne datacenter, a sam `localThreshold` jest na tyle elastyczny, że może się przesuwać podczas awarii jednej serwerowni i nie odetnie usługi od bazy danych tylko przekieruje do innego datacenter. 

Domyślnie wartość ta przyjmuje `15ms` w sterowniku javowym, więc raczej nie ma co się niepokoić że aktualnie ruch krąży między dc - chyba że datacenters mają bardzo szybkie czasy odpowiedzi między sobą.

Przykładowa konfiguracja:
``` java
MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                        .applyToClusterSettings(builder ->
                                builder
                                        .hosts(Collections.singletonList(new ServerAddress("mongos.somedomain.local", 27017)))
                                        .localThreshold(50, TimeUnit.MILLISECONDS)
                        )
                        .build())
```


### serverSelectionTimeout
Podobnie jak localThreshold, umożliwia sterownikowi odseparowanie hostów z najgorszymi czasami odpowiedzi. Tym razem to jest maksymalny czas, po którym przestaniemy uwzględniać tego hosta. Może być przydatny w momencie, gdy wszystkie hosty będą przeciążone i nie warto już dociążać ich bardziej.

Przykładowo, wszystkie hosty są obciążone i mają ping `470ms`, `490ms`, `550ms`. Przy `serverSelectionTimeout=500ms` odrzucimy hosta który odpowiedział sumarycznie w czasie `550ms`.

Domyślnie przyjmuje wartość `30s`.

Przykładowa konfiguracja:
``` java
MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                        .applyToClusterSettings(builder ->
                                builder
                                        .hosts(Collections.singletonList(new ServerAddress("mongos.somedomain.local", 27017)))
                              .serverSelectionTimeout(500, TimeUnit.MILLISECONDS)
                        )
                        .build());
```

### requiredReplicaSetName
Nazwa replicasetu, z którym aplikacja ma się połączyć. Przydatne, jeśli istnieje wiele replicasetów na jednym klastrze. 


### clusterListener
Listener, dzięki któremu można nasłuchiwać na zdarzenia związane z klastrem - połączenie, zmianę, zamknięcie połączenia. Przydatne przy zbieraniu metryk, debugowaniu, integracjach z bibliotekami. Aby to wykorzystać, należy zaimplementować metody w interfejsie ClusterListener (jawnie lub zaimplementować jako nową klasę).

Przykładowa konfiguracja:
``` java
MongoClient mongoClient = MongoClients.create(
                MongoClientSettings.builder()
                        .applyToClusterSettings(builder ->
                                builder
                                        .hosts(Collections.singletonList(new ServerAddress("mongos.somedomain.local", 27017)))
                                        .addClusterListener(new ClusterListener() {
                                            @Override
                                            public void clusterOpening(ClusterOpeningEvent event) {
                                                logger.info("Successfully connected to cluster with id: {}", event.getClusterId());
                                                registerMetrics(event);
                                                sendSomeInfoSomewhere();
                                                doSomething();
                                            }

                                            @Override
                                            public void clusterClosed(ClusterClosedEvent event) {
                                                logger.info("Connection to cluster closed with id: {}", event.getClusterId());
                                                sendSomeInfoSomewhere();
                                            }

                                            @Override
                                            public void clusterDescriptionChanged(ClusterDescriptionChangedEvent event) {
                                                logger.info("Cluster description changed with id: {}", event.getClusterId());
                                                doSomething();
                                            }
                                        })
                        )
```

### Dokumentacja MongoDB
Zachęcam do skorzystania z [dokumentacji mongo-java-drivera dla ClusterSettings](http://mongodb.github.io/mongo-java-driver/4.3/apidocs/mongodb-driver-core/com/mongodb/connection/ClusterSettings.Builder.html). Można tu znaleźć wiele przydatnych informacji na temat tych i innych parametrów. O parametrach można przeczytać również w [oficjalnych wytycznych](https://github.com/mongodb/specifications/blob/master/source/server-selection/server-selection.rst#localthresholdms)_.


To kilka przydatnych wartości, które warto znać i świadomie wykorzystywać. 






