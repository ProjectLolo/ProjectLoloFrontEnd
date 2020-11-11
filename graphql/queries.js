import gql from "graphql-tag";

export const GET_LOVEBANKS = gql`
  query loveBanks($kidId: String!) {
    loveBanks(kidId: $kidId) {
      title
      url
      preview
      description
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
    }
  }
`;

export const GET_COMMENTS_AND_LIKES = gql`
  query loveBankById($id: String!, $kidId: String!) {
    loveBankById(_id: $id, kidId: $kidId) {
      comments {
        userId
      }
      likes {
        userId
      }
    }
  }
`;
