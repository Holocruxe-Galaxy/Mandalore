import { Module } from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { ContactInfo, ContactInfoSchema } from './schemas/contact-info.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ContactInfo.name,
        schema: ContactInfoSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [ContactInfoService],
  exports: [ContactInfoService],
})
export class ContactInfoModule {}
