# graphql-example
Graphql example

// GET /api/v1/book?fields=name,author,year,img
// Чисто под фронтенд
// GET /api/v1/book/view - кратко(name,author,year,img)
// GET /api/v1/book/full - полно

// POST /api/v1/book
// { projection: { name: 1, author: 1, year: 1 } }
//

{
  name: 'Book1',
  author: 'Nik',
  year: 1998,
  img: 'url',
  description: 'long string(> 1000 symbols)'
  reviews: [
    {
      username: 'User1',
      review: 'long string(> 1000 symbols)',
      rating: 8
    },
    {
      username: 'User2',
      review: 'long string(> 1000 symbols)',
      rating: 8
    }
  ]
} // Отлично работают их агрегация.

// 1. Нам нужен язык запросов поверх HTTP сервера.
// 2. Описание контрактов(документация).
// В REST мире - подключаем сваггер, настраиваем его авто-генерацию.
// И, в большинстве случаем, дока отдельно код отдельно.
// 3. REST способ может быть громоздским.

// Бэкенд ориентированный API(REST) - фронтендеры просят бэкендеров что-то сделать.
// Фронтенд ориентированный API(GraphQL) - фронтендеры создают API как им удобно пользоваться.


// 1. Получить список книжек. Массив книжек.
// const books = await getBooks() // вернет список книжек
// getBooks - чтобы была описаны входные и выходные данные.
// Иметь возможность работать с этой функцией гибко.

// HTTP протокол.
// /api/v1/book?fields=name,author,year,img
// Одну точку входа и все действия описать в протоколе обмене.

// POST /api/gateway - точка входа в наш API.
// Все запросы идут через него.
Body {
  "version": "v1",
  "method": "getBooks",
  "params": {
    projection: {},
    limit: 10
  }
} 

Body {
  "version": "v1",
  "method": "getBook",
  "params": {
    projection: {},
  }
} 

Body {
  "version": "v1",
  "method": "getFavoriteBook",
  "params": {
    projection: {},
  }
} 

// RPC

/*
--> {"jsonrpc": "2.0", "method": "subtract", "params": [42, 23], "id": 1}
<-- {"jsonrpc": "2.0", "result": 19, "id": 1}
*/

  <!-- totalRating: 'reviews.sumRating / reviews.length', -->

Body {
  "version": "v1",
  "method": "getBook",
  "params": {
    projection: {
      name: 1,
      year: 1,
      author: 1
    },
  }
} 

// GraphQL
{
  book {
    name
    year
    author
  }
} -> преобразует в HTTP POST запрос

{
  "query": "query {\n  animals {\n    name\n  }\n}",
}

GET - на чтение -> GraphQL query -> чтение данных
POST, PUT, PATCH - на изменение -> GraphQL mutation -> изменение данных

Query - может запрашивать данные параллельно
Mutation - последовательно.

// 1. Используем абстракцию над HTTP
// 2. Описываем схемы: валидация + сериализация + документация.
// 3. Не отвлекаемся на поддержку веб-сервера, пишем обработчики.

// Query - чтения данных
// Mutatation - для изменения
// Subscription - слушаем события.

// оператор // название оператора может быть удобное для использования
query    animalsAndCurrencies    {
 animals {
  name
  id
 }
 currencies {
  ID
 }
}

// header запроса, а есть body запроса

// nestjs + graphQLserver
// express + graphQLserver
// graphql без ничего.
// mercurius на базе fastify.
// prisma. Server + database
