import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { AddMealDto } from "../dto/meals.dto";

@Injectable()
export class MealsService {
  constructor(
    private readonly mprismService: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}
  // add(craete) a meal
  async addMeal(addMealDto: AddMealDto, req: any) {
    const { name, description, price, estimatedPrice, category, images } =
      addMealDto;
    const restaurantId = req.restaurant.id;
    console.log("Resturant id : " + restaurantId);
    return { message: "Meal Added Successfully" };
  }
}
