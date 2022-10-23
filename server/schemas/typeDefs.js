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
  type Query {}

  # MUTATIONS
  type Mutation {}
`);

// The ID scalar type represents a unique identifier,
// often used to refetch an object or as the key for a cache.
// The ID type is serialized in the same way as a String;
// however, defining it as an ID signifies that it is
// not intended to be human‐readable.