import { Context, Query, Resolver } from "@nestjs/graphql";
import { OrdersService } from "../services/orders.service";
import { GetOrdersRespnse } from "../types/meals.types";
import { Request, Response } from "express";

@Resolver("Orders")
export class OrdersResolver {
  constructor(private readonly orderService: OrdersService) {}
  @Query(() => GetOrdersRespnse)
  async getOrders(@Context() ctx: { req: Request; res: Response }) {
    return await this.orderService.getOrders(ctx.req, ctx.res);
  }
}
