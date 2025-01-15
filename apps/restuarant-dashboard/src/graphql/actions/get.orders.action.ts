import { DocumentNode, gql } from "@apollo/client";

export const GET_ORDERS: DocumentNode = gql`
  query getOrders($getOrdersDto: GetOrdersDto!) {
    getOrders(getOrdersDto: $getOrdersDto) {
      id
      user_id
      meal_id
      quantity
      amount
      total_amount
    }
  }
`;
