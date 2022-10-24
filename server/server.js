import express from "express";
import { ApolloServer } from "apollo-server-express";
import { join } from "path";
import { typeDefs, resolvers } from "./schemas";
import { connection } from "./config";
import { ENV } from "./utils/constants";

const PORT = process.env.PORT || 3001;
const app = express();

// TODO: add middleware to context property
// we want the context fn to grab jwt from auth headers,
// decode, and return the payload
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // serve static assets in produciton
  if (process.env.NODE_ENV === ENV.PRODUCTION) {
    app.use(express.static(join(__dirname, "../client/build")));
  }

  // serve React client
  app.get("/", (_req, res) => {
    res.sendFile(join(__dirname, "../client/build/index.html"));
  });

  await server.start(); // start Apollo server
  server.applyMiddleware({ app }); // attach to Express server
  await connection(); // connect to MongoDB

  app.listen(PORT, () => {
    console.log(`App listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startApolloServer();
