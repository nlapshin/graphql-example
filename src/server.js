const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { execute, subscribe, GraphQLError } = require("graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const path = require("path");
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { SubscriptionServer } = require("subscriptions-transport-ws");
const CurrencyAPI = require('./data-source/currency');
const userDetailsLoader = require('./entities/users/users.dataloader');
const mongoose = require('mongoose');

;(async() => {
  mongoose.connect('mongodb://127.0.0.1:27017/myapp');

  const app = express();
  const httpServer = http.createServer(app);

  const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
  const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    shouldBatch: true,
  });
  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: function({ req }) {
        const token = req.headers.authorization || '';
  
        // console.log(token);
  
        // if (token !== 'token') {
        //   throw new GraphQLError('User is not authenticated', {
        //     extensions: {
        //       code: 'UNAUTHENTICATED',
        //       http: { status: 401 },
        //     },
        //   });
        // }
  
        return {
          currencyAPI: new CurrencyAPI(),
          userDetailsLoader
        }
      }
    }),
  );

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  await new Promise((resolve) => httpServer.listen({ port: 3010 }, resolve));
  console.log(`🚀 Server ready at http://localhost:3010`);
})();





// const path = require("path");
// const express = require("express");
// const { createServer } = require('http');
// const { execute, subscribe } = require("graphql");

// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');

// const { loadFilesSync } = require("@graphql-tools/load-files");
// const { makeExecutableSchema } = require("@graphql-tools/schema");
// const { SubscriptionServer } = require("subscriptions-transport-ws");
// const { MongoClient } = require('mongodb');

// const CurrencyAPI = require('./data-source/currency')

// const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
// const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

// async function startApolloServer() {
//   const app = express();
//   const httpServer = createServer(app);
//   const mongodb = await startMongodb()

//   const schema = makeExecutableSchema({
//     typeDefs: typesArray,
//     resolvers: resolversArray,
//   });

//   const server = new ApolloServer({
//     schema,
//     dataSources: () => ({
//       currencyAPI: new CurrencyAPI()
//     }),
//     context: function({ req }) {
//       const token = req.headers.authorization || '';

//       if (token !== 'token') {
//         throw new AuthenticationError('permission denied')
//       }

//       return {
//         mongodb: mongodb
//       }
//     }
//   });

//   await server.start();
//   server.applyMiddleware({ app, path: "/graphql" });

//   SubscriptionServer.create(
//     { schema, execute, subscribe },
//     { server: httpServer, path: server.graphqlPath }
//   );

//   httpServer.listen(3010, () => {
//     console.log("Running GraphQL server on 3010 port");
//   });
// }

// async function startMongodb() {
//   const url = 'mongodb://localhost:27017';
//   const client = new MongoClient(url);

//   const dbName = 'test';

//   await client.connect();
//   console.log('Connected successfully to server');

//   const db = client.db(dbName);

//   return db
// }

// startApolloServer();
