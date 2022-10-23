import { gql } from "apollo-server-express";

export const typeDefs = gql(`
  # Models
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

  # Authentication
  type Auth {
    token: ID!
    user: User
  }

  # QUERIES
  type Query {
    users: [User]
    books: [Book]
  }

`);
