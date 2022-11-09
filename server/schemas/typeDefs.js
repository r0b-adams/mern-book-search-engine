import { gql } from "apollo-server-express";

export const typeDefs = gql(`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  input AddUserInput {
    username: String!
    email: String!
    password:String!
  }

  input LoginInput {
    username: String
    email: String!
    password:String!
  }

  type Book {
    bookId: String!
    title: String!
    authors: [String]!
    description: String!
    image: String!
    link: String
  }

  input SaveBookInput {
    bookId: String!
    title: String!
    authors: [String]!
    description: String!
    image: String!
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(payload: AddUserInput!): Auth
    login(payload: LoginInput!): Auth
    saveBook(payload: SaveBookInput!): User
    removeBook(bookId: String!): User
  }
`);
