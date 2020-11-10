import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export const CREATE_KID = gql`
  mutation createKid(
    $name: String!
    $nickName: String!
    $birthdate: String!
    $profileImageUrl: String!
  ) {
    createKid(
      kidInput: {
        name: $name
        nickName: $nickName
        birthdate: $birthdate
        profileImageUrl: $profileImageUrl
      }
    ) {
      _id
      name
      nickName
      birthdate
      profileImageUrl
      code
    }
  }
`;

export const SIGNUP = gql`
  mutation signup(
    $firstName: String!
    $lastName: String
    $email: String!
    $password: String!
  ) {
    signup(
      signupInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      firstName
      lastName
      email
      id
      token
    }
  }
`;
