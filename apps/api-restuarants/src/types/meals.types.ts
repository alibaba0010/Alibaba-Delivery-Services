import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "./user.type";

@ObjectType()
export class AddMealResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
