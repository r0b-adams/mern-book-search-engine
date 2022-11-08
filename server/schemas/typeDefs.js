import { gql } from "apollo-server-express";

export const typeDefs = gql(`
  # MODELS
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    _id:ID!
    bookID: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # QUERIES
  type Query {
    users: [User]
    me: User
  }

  # MUTATIONS
  type Mutation {
    signup(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`);
