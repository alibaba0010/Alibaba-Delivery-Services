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
      const result = await cloudinary.uploader.upload(image);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
