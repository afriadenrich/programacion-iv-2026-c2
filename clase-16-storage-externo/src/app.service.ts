import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class AppService {
  constructor() {
    const API_KEY = process.env.CLOUDINARY_API_KEY || '';
    const API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';

    cloudinary.config({
      api_key: API_KEY,
      api_secret: API_SECRET,
      cloud_name: CLOUD_NAME,
    });
  }

  async subirArchivo(file: Express.Multer.File) {
    const base64 = file.buffer.toString('base64');
    console.log(base64);

    const uri = `data:${file.mimetype};base64,${base64}`;

    const uploadStream = await cloudinary.uploader.upload(uri, {
      folder: 'clase-16',
      public_id: `${Date.now()}-clase`, // el .png se agrega solo
    });

    return uploadStream.url;
  }
}
