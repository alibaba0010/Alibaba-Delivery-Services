"use client";
import { gql, DocumentNode } from "@apollo/client";

export const ADD_MEAL: DocumentNode = gql`
  mutation AddMeal($addMealDto: addMealDto!) {
    addMeal(addMealDto: $addMealDto) {
      message
    }
  }
`;
