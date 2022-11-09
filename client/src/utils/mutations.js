import { gql } from "@apollo/client";

export const ADD_USER = gql`
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
`;

// export const LOGIN_USER = gql(``);

// export const SAVE_BOOK = gql(``);

// export const REMOVE_BOOK = gql(``);
