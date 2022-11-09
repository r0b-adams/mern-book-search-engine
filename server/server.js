import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { join } from "path";
import { connection } from "./config";
import { typeDefs, resolvers } from "./schemas";
import { context } from "./utils/auth";

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

const startApolloServer = async () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // serve static assets in produciton
  if (process.env.NODE_ENV === "production") {
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
