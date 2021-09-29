---
title: "Elasticsearch - to nie tylko logi."
slug: elasticsearch-searching
description: "Elasticsearch - nie tylko logi"
date: 2020-09-07 22:56:24
author: Julia
tags:
    - elk
    - elasticsearch
    - data
    - database
cover: /images/posts/elasticsearch-zapytania/searching.jpg


---

Elasticsearch to zaawansowany silnik wyszukiwań a jednocześnie baza danych pozwalająca na przechowywanie różnych typów danych. Wykorzystywana jest głównie przy komercyjnych wyszukiwarkach oraz przy gromadzeniu logów systemowych. Dzięki Elasticsearch, możesz wykonywać skomplikowane wyszukiwania, filtry i agregacje, a także wykorzystywać słowniki.
### Wstępne ustalenia
Ogólnie myślę, że sensownie będzie zapisywać działania do plików, dzięki czemu będzie łatwiej zrekonstruować listę kroków. Warto utworzyć tworzyć osobny katalog na czas ćwiczeń. Całość prawdopodobnie złożę jako projekt na githubie, więc będzie dostępny do sklonowania. 
### Przykładowy use case
Razem z moim trzyosobowym zespołem w ramach hobbystycznych praktyk rozwijaliśmy mini-platformę do wystawiania ogłoszeń. Jednym z wymagań była wyszukiwarka, dzięki której mozna wyszukiwać produkty: po tytule, slowach kluczowych, kategorii, cenie i lokalizacji. Zdecydowaliśmy się na elasticsearch, ponieważ wspiera wyszukiwanie pełnotekstowe i geograficzne.
### Setup
Na potrzeby zabawy postawimy sobie 2 kontenery dockerowe z elasticem + kibaną. Zdefiniowaliśmy:
* 1 kontener z elasticsearch w wersji 7.8.0
* 1 kontener z kibaną w wersji 7.6.0
* 2 woluminy, na których będą przechowywane dane
* sieć o nazwie elastic-network

Wersje nie są najnowsze, ale akurat miałam te obrazy lokalnie na komputerze. Można w razie czego zmienić na nowszą.

``` yml
version: '2.2'
services:
 es01:
   image: docker.elastic.co/elasticsearch/elasticsearch:7.8.0
   environment:
     - bootstrap.memory_lock=true
     - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
     - discovery.type=single-node
 
   volumes:
     - data01:/usr/share/elasticsearch/data
   ports:
     - 9200:9200
   networks:
     - elastic-network
 kibana01:
   image: docker.elastic.co/kibana/kibana:7.6.0
   container_name: kib01
   ports:
     - 5601:5601
   environment:
     ELASTICSEARCH_URL: http://es01:9200
     ELASTICSEARCH_HOSTS: http://es01:9200
   depends_on:
     - es01
   networks:
     - elastic-network
 
volumes:
 data01:
   driver: local
 
networks:
 elastic-network:
   driver: bridge
```


Przeklejamy powyższy plik do docker-compose.yml i zapisujemy. Posiadamy już deklaratywny plik, na podstawie którego docker-compose utworzy wszystko za nas.
Wykonujemy polecenie (dla osób z słabszym internetem - może trochę potrwać, bo pobierają się obrazy):

```sh
docker-compose up
```

Sprawdzamy czy wszystko działa:
```sh
docker ps
```

Powinny się nam pojawić 2 działajace kontenery. Jeśli tak, to fajnie. :)

### Model danych
Zanim cokolwiek ciekawego zaczniemy robić, musimy zamodelować nasze dane. 
```yml
    "title": "text"
    "description": "text"
    "location":"geo_point"
    "price": "double"
```

Idziemy w maksymalne uproszczenie schematu. Myślę, że model jest dość czytelny. Id zostanie dodane automatycznie. Mamy title i description o typie text, location jest punktem (x,y), który można osadzić na mapie, price to cena - double. Tyle na teraz wystarczy.

### Mappingi & Typy
W Elasticu nasz “scheme” definiujemy za pomocą mappingów. Określamy w nich strukturę dokumentów (np offer ). W mappingach można również zawrzeć w nich dodatkowe techniczne ustawienia - ilość replik, timeouty. Dawniej w jednym indexie mozna było przechowywać wiele typów, co powodowało czasem dziwne błędy. Jednak w najnowszych wersjach elastica, jest jeden “typ” per index. Da się to ominąć, znajdziesz to w [dokumentacji]( https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html#_custom_type_field. "dokumentacji").

Zapisujemy poniższą składnię w pliku offer_mapping.json. Umożliwi to nam stworzenie indeksu. Wykorzystamy go za chwile. 

```json
{
    "mappings": {
        "properties": {
               "title": {
                  "type": "text"
               },
               "description": {
                   "type": "text"
               },
               "location": {
                   "type": "geo_point"
               },
               "price": {
                   "type": "double"
               }
      }
    }
}
```

Wykonujemy komendę, tworząc tym samym nowy index.

```sh
curl -H "Content-Type: application/json" -X PUT http://localhost:3000/offers --data "@offer_schema.json"
```

W dalszej części do wykonywania requestów będę już używać devtoolsów w kibanie, bo będzie czytelniej. Jeśli nie chcesz tego używać i wolisz CLI, z łatwością wykonasz requesty np. curlem, jak powyżej.



#### Kibana Devtools
![Tak wyglądają devtoolsy](/images/posts/elasticsearch-zapytania/elasticsearch-1.png "Tak wyglądają devtoolsy")


### Feedowanie danych
Poniżej mini-zbiór danych do sprawdzenia, jak to działa.

```json
POST offers/_doc
{
              "title": "skarpety rozmiar 36",
              "description": "kolorowe skarpetki w kropki",
              "location":  {
                 "lat" : 40, 
                 "lon" : -70
               },
              "price": 10.00
}

POST offers/_doc
{
               "title": "szelki",
               "description": "szelki w kolorze czarnym, rozmiar XS",
               "location":  {
                 "lat" : 50, 
                 "lon" : -40
               },
               "price": 14.00

}

POST offers/_doc
{
               "title": "muszka",
               "description": "czerwona, męska",
               "location":  {
                 "lat" : 50, 
                 "lon" : -30
               },
               "price": 130.00

}
```

### Scenariusze z życia wzięte:
#### Użytkownik wyszukuje pełnotekstowo po tytule oferty:

```json
GET offers/_search
{
  "query": {
    "match": {
      "title": "skarpetki"
    }
  }
}
```

Odpowiedź z serwera, widzimy znaleziony rekord, ponieważ w tytule zawarte jest słowo "skarpetki":

```json 
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 0.7389809,
    "hits" : [
      {
        "_index" : "offers",
        "_type" : "_doc",
        "_id" : "QiyNanQB6SAY5Ir04SbI",
        "_score" : 0.7389809,
        "_source" : {
          "title" : "skarpety rozmiar 36",
          "description" : "kolorowe skarpetki w kropki",
          "location" : {
            "lat" : 40,
            "lon" : -70
          },
          "price" : 10.0
        }
      }
    ]
  }
}
```


#### Użytkownik w filtrach wybiera zakres cenowy
Ustalamy:
* gte (greater than or equal) - większe lub równe 10, 
* lte (lower than or equal) - mniejsze lub równe 20

```json
GET offers/_search
{
    "query": {
        "range" : {
            "price" : {
                "gte" : 10,
                "lte" : 20,
                "boost" : 2.0
            }
        }
    }
}
```

Znalezione 2 oferty, z ceną większą niż 10 ale mniejszą niż 20.

```json
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 2.0,
    "hits" : [
      {
        "_index" : "offers",
        "_type" : "_doc",
        "_id" : "QiyNanQB6SAY5Ir04SbI",
        "_score" : 2.0,
        "_source" : {
          "title" : "skarpety rozmiar 36",
          "description" : "kolorowe skarpetki w kropki",
          "location" : {
            "lat" : 40,
            "lon" : -70
          },
          "price" : 10.0
        }
      },
      {
        "_index" : "offers",
        "_type" : "_doc",
        "_id" : "RCyNanQB6SAY5Ir07CYY",
        "_score" : 2.0,
        "_source" : {
          "title" : "szelki",
          "description" : "szelki w kolorze czarnym, rozmiar XS",
          "location" : {
            "lat" : 50,
            "lon" : -40
          },
          "price" : 14.0
        }
      }
    ]
  }
}
```

#### Szukanie po lokalizacji:
Chcemy znaleźć oferty w promieniu 100km od miejscowości o współrzędnych [-70.001, 40.002]

```json
GET offers/_search
{
    "query": {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_distance" : {
                    "distance" : "100km",
                    "location" : [-70.001, 40.002]
                }
            }
        }
    }
}
```

Odpowiedź z serwera:
```json
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "offers",
        "_type" : "_doc",
        "_id" : "-SyVanQB6SAY5Ir0BSZs",
        "_score" : 1.0,
        "_source" : {
          "title" : "skarpety rozmiar 36",
          "description" : "kolorowe skarpetki w kropki",
          "location" : {
            "lat" : 40,
            "lon" : -70
          },
          "price" : 10.0
        }
      }
    ]
  }
}
```
Znalazło 1 rekord o współrzędnych [-70, 40].

#### Wyszukiwanie również w opisie
Mamy 1 rekord, który w tytule ma "skarpety" a w opisie "skarpetki". Chcemy go wyszukać po opisie. Ogólnie da się skonfigurować, żeby wyszukiwało pochodne słowa od skarpety, ale to może w innym poście :)

```json
GET offers/_search
{
  "query": {
    "multi_match" : {
      "query":    "skarpetki", 
      "fields": [ "title", "description" ] 
    }
  }
}
```

No i mamy znalezione skarpetki.

```json
{
  "took" : 0,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 0.9808291,
    "hits" : [
      {
        "_index" : "offers",
        "_type" : "_doc",
        "_id" : "-SyVanQB6SAY5Ir0BSZs",
        "_score" : 0.9808291,
        "_source" : {
          "title" : "skarpety rozmiar 36",
          "description" : "kolorowe skarpetki w kropki",
          "location" : {
            "lat" : 40,
            "lon" : -70
          },
          "price" : 10.0
        }
      }
    ]
  }
}

```

To tyle na dziś. Jako czytelnik różnych blogów lubię, gdy jest dużo przykładów, więc też w takiej formie postanowiłam stworzyć wpis. Będę testować, czy przyjemniej mi się tak pisze.



