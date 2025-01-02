import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { AddMealDto } from "../dto/meals.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

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
  async addMeal(addMealDto: AddMealDto, req: any) {
    const { name, description, price, estimatedPrice, category, images } =
      addMealDto;
    const restaurantId = req.restaurant.id;
    console.log("Resturant id : " + restaurantId);
    try {
      let mealImages: Images | any = [];

      for (const image of images) {
        console.log("Image : " + image);
        if (typeof image === "string") {
          const data = await this.cloudinaryService.uploadImage(image);
          mealImages.push({
            public_id: data.public_id,
            url: data.secure_url,
          });
        }
      }
      console.log("Saved images");
      await this.prismaService.meals.create({
        data: {
          name,
          description,
          price,
          estimatedPrice,
          category,
          restaurant: { connect: { id: restaurantId } },
          images: mealImages.map(
            (image: { public_id: string; url: string }) => ({
              public_id: image.public_id,
              url: image.url,
            })
          ),
        },
      });
      return { message: "Meal Added Successfully" };
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }
}
