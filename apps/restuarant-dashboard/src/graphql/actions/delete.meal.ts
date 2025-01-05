import { gql, DocumentNode } from "@apollo/client";

export const DELETE_MEAL: DocumentNode = gql`
  mutation deleteMeal($delemealDto: DeleteMealDto!) {
  }
  `;
