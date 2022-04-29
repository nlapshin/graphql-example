const path = require("path");
const express = require("express");
const { createServer } = require('http');
const { execute, subscribe } = require("graphql");

const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { MongoClient } = require('mongodb');

const CurrencyAPI = require('./data-source/currency')

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

async function startApolloServer() {
  const app = express();
  const httpServer = createServer(app);
  const mongodb = await startMongodb()

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      currencyAPI: new CurrencyAPI()
    }),
    context: function({ req }) {
      const token = req.headers.authorization || '';

      if (token !== 'token') {
        throw new AuthenticationError('permission denied')
      }

      return {
        mongodb: mongodb
      }
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  httpServer.listen(3010, () => {
    console.log("Running GraphQL server on 3010 port");
  });
}

async function startMongodb() {
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  const dbName = 'test';

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  return db
}

startApolloServer();
