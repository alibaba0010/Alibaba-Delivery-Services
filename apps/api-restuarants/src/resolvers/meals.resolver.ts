import { Args, Context, Mutation, Resolver, Query } from "@nestjs/graphql";
import { MealsService } from "../services/meals.service";
import {
  AddMealResponse,
  DeleteMealResponse,
  GetMealResponse,
} from "../types/meals.types";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { AddMealDto, DeleteMealDto } from "../dto/meals.dto";
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
  @Query(() => GetMealResponse)
  @UseGuards(AuthGuard)
  async getCurrentRestaurantMeals(
    @Context() context: { req: Request; res: Response }
  ) {
    return await this.mealsService.getCurrentRestaurantMeals(
      context.req,
      context.res
    );
  }
  @Mutation(() => DeleteMealResponse)
  @UseGuards(AuthGuard)
  async deleteMeal(
    @Args("deleteMealDto") deleteMealDto: DeleteMealDto,
    @Context() context: { req: Request; res: Response }
  ): Promise<DeleteMealResponse> {
    return await this.mealsService.deleteMealById(
      deleteMealDto,
      context.req,
      context.res
    );
  }
}
