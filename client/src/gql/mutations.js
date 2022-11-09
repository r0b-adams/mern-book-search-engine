import { gql } from "@apollo/client";

export const ADD_USER = gql(`
  mutation addUser($payload: AddUserInput!) {
    addUser(payload: $payload) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          image
          link
          title
        }
      }
    }
  }
`);

export const LOGIN_USER = gql(`
  mutation login($payload: LoginInput!) {
    login(payload: $payload) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
        }
      }
    }
  }
`);

export const SAVE_BOOK = gql(`
  mutation saveBook($payload: SaveBookInput!) {
    saveBook(payload: $payload) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`);

// export const REMOVE_BOOK = gql(``);
