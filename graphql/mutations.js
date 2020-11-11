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
    $lastName: String!
    $email: String!
    $password: String!
    $profilePic: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      profilePic: $profilePic
    ) {
      firstName
      lastName
      email
      id
      token
    }
  }
`;

<<<<<<< HEAD
export const ADD_KID_PROFILE_IMAGE = gql`
mutation addKidProfileImage(
  $kidId: String!
  $imageUrl: String!
) {
  addKidProfileImage(
      id: $kidId
      imageUrl: $imageUrl
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
=======
export const CREATE_LOVEBANK = gql`
  mutation createLoveBank(
    $title: String!
    $url: String!
    $preview: String!
    $description: String!
    $category: String!
    $kidId: ID
  ) {
    createLoveBank(
      title: $title
      url: $url
      preview: $preview
      description: $description
      category: $category
      kidId: $kidId
    ) {
      _id
    }
  }
`;
>>>>>>> 78fed4434e56aef01529a972d3d50a926fd96d83
