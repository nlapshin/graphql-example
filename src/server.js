const path = require("path");
const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const CurrencyAPI = require('./data-source/currency')

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      currencyAPI: new CurrencyAPI()
    }),

    context: ({ req }) => {
      const token = req.headers.authorization || '';

      if (token !== 'token') {
        throw new AuthenticationError('permission denied')
      }
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(3000, () => {
    console.log("Running GraphQL server on 3000 port");
  });
}

startApolloServer();
