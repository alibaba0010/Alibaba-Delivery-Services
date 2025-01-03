import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "./user.type";
import { Meal } from "../entities/meals.entities";
import { Meals } from "@prisma/client";

@ObjectType()
export class AddMealResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class GetMealResponse {
  @Field(() => [Meal], { nullable: true })
  meal?: Meals;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
