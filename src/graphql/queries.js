import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query repos { 
    repositories {
        edges{
            node{
              id
              ownerAvatarUrl
              fullName
              description
              language
              stargazersCount
              forksCount
              reviewCount
              ratingAverage
              language
            }
        }
    }
  }
  `;

export const GET_SIGNED_IN_USER = gql`
query repos {
    me {
      id
      username
    }
  }
  `;