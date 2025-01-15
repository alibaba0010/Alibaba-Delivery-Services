import { Field, InputType } from "@nestjs/graphql";
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

@InputType()
export class AddMealDto {
  @Field()
  @IsNotEmpty({ message: "Meal Name is required." })
  @IsString({ message: "Meal Name must need to be one string." })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Meal description is required." })
  @IsString({ message: "Meal description must need to be one string." })
  description: string;

  @Field()
  @IsNotEmpty({ message: "Meal price is required." })
  price: number;

  @Field()
  @IsNotEmpty({ message: "Meal estimated price is required." })
  estimatedPrice: number;

  @Field()
  @IsNotEmpty({ message: "Meal category is required." })
  @IsString({ message: "Meal category must need to be one string." })
  category: string;

  @Field(() => [String])
  @IsArray({ message: "Meal images must be an array." })
  @ArrayNotEmpty({ message: "Meal images array must not be empty." })
  images: string[];
}

@InputType()
export class DeleteMealDto {
  @Field()
  @IsNotEmpty({ message: "Meal id is required." })
  @IsString({ message: "Meal id must need to be one string." })
  id: string;
}

@InputType()
export class GetOrdersDto {
  @Field()
  @IsNumber({}, { message: "Page must be a number." })
  @IsNotEmpty({ message: "Page is required." })
  page: number;

  @Field()
  @IsNumber({}, { message: "PageSize must be a number." })
  @IsNotEmpty({ message: "PageSize is required." })
  pageSize: number;
}
