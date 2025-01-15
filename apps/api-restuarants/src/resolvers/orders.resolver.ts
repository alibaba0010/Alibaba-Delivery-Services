import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { OrdersService } from "../services/orders.service";
import { GetOrdersRespnse } from "../types/meals.types";
import { Request, Response } from "express";
import { GetOrdersDto } from "../dto/meals.dto";

@Resolver("Orders")
export class OrdersResolver {
  constructor(private readonly orderService: OrdersService) {}
  @Query(() => GetOrdersRespnse)
  async getOrders(
    @Args("getOrdersDto") getOrdersDto: GetOrdersDto,
    @Context() ctx: { req: Request; res: Response }
  ) {
    return await this.orderService.getOrders(getOrdersDto, ctx.req, ctx.res);
  }
}
