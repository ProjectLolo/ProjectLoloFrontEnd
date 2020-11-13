import gql from "graphql-tag";

export const GET_LOVEBANKS = gql`
  query loveBanks($kidId: ID) {
    loveBanks(kidId: $kidId) {
      title
      url
      preview
      description
      type
      category
      kidId
      userId
    }
  }
`;

export const GET_ALL_KIDS = gql`
  query findAllKids($userId: String!) {
    findAllKids(userId: $userId) {
      _id
      name
      nickName
      birthdate
      profileImageUrl
      userId
      code
    }
  }
`;

export const FIND_KID_BY_CODE = gql`
  query findKidByCode($code: String!) {
    findKidByCode(code: $code) {
      _id
      name
      nickName
      birthdate
      profileImageUrl
      userId
    }
  }
`;

export const FIND_USER_BY_ID = gql`
  query findUserById($id: String!) {
    findUserById(id: $id) {
      id
      firstName
      lastName
      email
      nickName
      profilePic
    }
  }
`;
