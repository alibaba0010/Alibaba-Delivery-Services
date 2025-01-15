import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { Request, Response } from "express";

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  // get all orders using pagination query
  async getOrders(req: any, response: Response) {
    const page = 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const posts = await this.prismaService.orders.findMany({
      skip: skip,
      take: take,
      orderBy: {
        createdAt: "desc", // or any other field you want to order by
      },
    });

    const totalPosts = await this.prismaService.orders.count();

    return {
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / pageSize),
      currentPage: page,
    };
  }
}
