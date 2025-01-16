import { DocumentNode, gql } from "@apollo/client";

export const GET_ORDERS: DocumentNode = gql`
  query getOrders($getOrdersDto: GetOrdersDto!) {
    getOrders(getOrdersDto: $getOrdersDto) {
      orders {
        id
        userId
        mealId
        restaurantId
        quantity
        amount
        totalAmount
        createdAt
        updatedAt
      }
      totalOrders
      totalPages
      currentPage
    }
  }
`;
