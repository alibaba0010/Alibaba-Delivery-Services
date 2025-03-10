import { DocumentNode, gql } from "@apollo/client";

export const LOGIN_USER: DocumentNode = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(loginInput: { email: $email, password: $password }) {
      user {
        id
        name
        email
        password
        address
        contact
      }
      accessToken
      refreshToken
      error {
        message
      }
    }
  }
`;
