import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { Request, Response } from "express";
import { GetOrdersDto } from "../dto/meals.dto";

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  // get all orders using pagination query
  async getOrders(getOrderDto: GetOrdersDto, req: any, response: Response) {
    const { page, pageSize } = getOrderDto;
    console.log(`Page: ${page}, PageSize: ${pageSize}`);
    if (page <= 0 || pageSize <= 0) {
      throw new BadRequestException(
        "Page and pageSize must be positive integers"
      );
    }
    const skip = (page - 1) * pageSize;
    try {
      const orders = await this.prismaService.orders.findMany({
        skip: skip,
        take: pageSize,
        orderBy: {
          createdAt: "desc", // or any other field you want to order by
        },
      });

      const totalOrders = await this.prismaService.orders.count();

      return {
        orders,
        totalOrders,
        totalPages: Math.ceil(totalOrders / pageSize),
        currentPage: page,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
