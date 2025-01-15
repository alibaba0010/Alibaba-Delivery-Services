import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "./user.type";
import { Meal, Orders } from "../entities/meals.entities";
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
  meals?: Meals;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class DeleteMealResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
@ObjectType()
export class GetOrdersRespnse {
  @Field(() => [Orders], { nullable: true })
  orders?: Orders;

  @Field(() => Number, { nullable: true })
  totalOrders?: number;
  @Field(() => Number, { nullable: true })
  totalPages?: number;
  @Field(() => Number, { nullable: true })
  currentPage?: number;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
