import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query repos($orderDirection: OrderDirection $orderBy: AllRepositoriesOrderBy) { 
    repositories(orderDirection: $orderDirection orderBy: $orderBy) {
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
              url
            }
        }
    }
  }
  `;

export const GET_SINGLE_REPOSITORY = gql`
query repo($id: ID!){
  repository(id: $id) {
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
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
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

export const GET_MY_REVIEWS = gql`
query repos {
  me {
    id
    username
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
          repository {
            fullName
            id
            url
          }
        }
      }
    }
  }
}
  `;