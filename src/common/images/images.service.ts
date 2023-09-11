import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ObjectId } from 'mongoose';

interface PhotoParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ContentType: string;
}

@Injectable()
export class ImagesService {
  constructor(
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}

  private s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('MANDALORE_AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get(
        'MANDALORE_AWS_SECRET_ACCESS_KEY',
      ),
    },
    region: this.configService.get('MANDALORE_AWS_S3_BUCKET_REGION'),
  });

  async uploadManager(
    photo: Express.Multer.File,
    id: ObjectId,
  ): Promise<string> {
    try {
      const imageName = this.nameFormatter('post', id, photo.originalname);

      await this.uploadPhoto(photo, {
        Bucket: this.configService.get('MANDALORE_AWS_S3_BUCKET_NAME'),
        Key: imageName,
        Body: photo.buffer,
        ContentType: photo.mimetype,
      });

      return imageName;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(imageName: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('MANDALORE_AWS_S3_BUCKET_NAME'),
      Key: imageName,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: 60 * 60 * 2,
    });

    return url;
  }

  private async uploadPhoto(photo: Express.Multer.File, params: PhotoParams) {
    const command = new PutObjectCommand(params);
    await this.s3Client.send(command);
  }

  private nameFormatter(entityName: string, id: ObjectId, fileName: string) {
    return `${entityName}/${id}_${fileName}_${Date.now()}`;
  }
}
