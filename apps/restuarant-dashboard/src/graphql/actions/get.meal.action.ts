import { gql, DocumentNode } from "@apollo/client";

export const GET_MEALS: DocumentNode = gql`
  query {
    getCurrentRestaurantMeals {
      meals {
        id
        name
        price
        description
        images {
          public_id
          url
        }
        restaurantId
        price
        estimatedPrice
        category
        createdAt
        updatedAt
      }
    }
  }
`;
