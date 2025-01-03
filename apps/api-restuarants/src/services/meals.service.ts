import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { AddMealDto } from "../dto/meals.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { Response } from "express";

type Images = {
  public_id: string;
  url: string;
};

@Injectable()
export class MealsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  // add(craete) a meal
  async addMeal(addMealDto: AddMealDto, req: any, response: Response) {
    console.log("Restaurant request: ", req.restaurant);

    const { name, description, price, estimatedPrice, category, images } =
      addMealDto;
    const restaurantId = req.restaurant.id;
    try {
      let mealImages: Images | any = [];

      for (const image of images) {
        if (typeof image === "string") {
          const data = await this.cloudinaryService.uploadImage(image);
          mealImages.push({
            public_id: data.public_id,
            url: data.secure_url,
          });
        }
      }
      const newImages = {
        images: {
          create: mealImages.map(
            (image: { public_id: string; url: string }) => ({
              public_id: image.public_id,
              url: image.url,
            })
          ),
        },
      };

      await this.prismaService.meals.create({
        data: {
          name,
          description,
          price,
          estimatedPrice,
          category,
          restaurantId,
          // restaurant: { connect: { id: restaurantId } },
          images: newImages.images,
        },
      });
      return { message: "Meal Added Successfully" };
    } catch (error) {
      console.log(error);
      return { message: error };
    }
  }
  // get all fodds for the currrent logged in restaurant
  async getCurrentRestaurantMeals(req: any, response: Response) {
    console.log("Restaurant request: ", req.restaurant);
    const { id: restaurantId } = req.restaurant;
    const meal = await this.prismaService.meals.findMany({
      where: { restaurantId },
      include: { images: true, restaurant: true },
      orderBy: { createdAt: "desc" },
    });
    return { meal };
  }
  // get all foods
}
