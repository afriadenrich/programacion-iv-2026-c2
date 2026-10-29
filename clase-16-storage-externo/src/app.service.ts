import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
const API_KEY = process.env.CLOUDINARY_API_KEY || '';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';

@Injectable()
export class AppService {
  subirArchivo(file: Express.Multer.File): string {
    cloudinary.config({
      api_key: API_KEY,
      api_secret: API_SECRET,
      cloud_name: CLOUD_NAME,
      secure: false,
    });

    const stream = file.buffer;

    const uploadStream = cloudinary.uploader.upload_stream(
      stream,
      (err, result) => {
        console.log(err, result);
      },
    );
    console.log(uploadStream);

    uploadStream.end();

    return '';
  }
}
