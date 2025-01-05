import { Injectable } from "@nestjs/common";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";

type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
@Injectable()
export class CloudinaryService {
  constructor() {}
  async uploadImage(image: string): Promise<CloudinaryResponse> {
    try {
      const result = await cloudinary.uploader.upload(image, {
        folder: "Meals",
        resource_type: "image",
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteImage(public_id: string) {
    try {
      await cloudinary.uploader.destroy(public_id);
      return { message: "Image deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}
