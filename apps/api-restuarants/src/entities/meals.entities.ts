import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Images {
  @Field()
  public_id: string;

  @Field()
  url: string;
}
@ObjectType()
export class Meal {
  @Field()
  id?: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;
  @Field()
  estimatedPrice: number;

  @Field()
  category: string;

  @Field(() => [Images])
  images: Images[];

  @Field()
  restaurantId: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
@ObjectType()
export class Orders {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  mealId: string;
  @Field()
  restaurantId: string;

  @Field()
  quantity: number;

  @Field()
  amount: number;

  @Field()
  totalAmount: number;

  @Field()
  createdAt?: Date;
  @Field()
  updatedAt?: Date;
}
