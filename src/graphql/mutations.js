import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
  `;

export const CREATE_REVIEW = gql`
mutation CreateReview($input: CreateReviewInput){
  createReview(review: $input){
    repositoryId
  }
}
`;

export const SIGN_UP = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(user: $input) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;