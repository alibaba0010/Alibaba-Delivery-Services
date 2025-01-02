import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { MealsService } from "../services/meals.service";
import { AddMealResponse } from "../types/meals.types";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { AddMealDto } from "../dto/meals.dto";
import { Request, Response } from "express";

@Resolver("Meals")
export class MealsResolver {
  // resolvers here
  constructor(private readonly mealsService: MealsService) {}
  @Mutation(() => AddMealResponse)
  @UseGuards(AuthGuard)
  async addMeal(
    @Args("addMealDto") addMealDto: AddMealDto,
    @Context() context: { req: Request; res: Response }
  ): Promise<AddMealResponse> {
    return await this.mealsService.addMeal(
      addMealDto,
      context.req,
      context.res
    );
  }
}
