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

export const ADD_KID_PROFILE_IMAGE = gql`
mutation addKidProfileImage(
  $id: String!
  $imageUrl: String!
) {
  addKidProfileImage(
      id: $id
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

export const UPDATE_KID_PROFILE = gql`
mutation updateKidProfile(
  $id: String!
  $name: String!
  $nickName: String!
  $birthdate: String!
  $profileImageUrl: String!
) {
  updateKidProfile(
      id: $id
      name: $name
      nickName: $nickName
      birthdate: $birthdate
      profileImageUrl: $profileImageUrl
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


export const ADD_MEMBER = gql`
  mutation addMember(
    $kidId: String!
    $relation: String!
    $notification: String!
  ) {
    addMember(kidId: $kidId, relation: $relation, notification: $notification) {
      _id
      userId
      relation
      notification
      kid {
        _id
      }
    }
  }
`;

