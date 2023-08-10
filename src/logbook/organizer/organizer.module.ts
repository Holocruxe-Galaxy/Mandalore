import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizerService } from './organizer.service';
import { OrganizerController } from './organizer.controller';

import { Organizer, OrganizerSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Organizer.name,
        schema: OrganizerSchema,
      },
    ]),
  ],
  controllers: [OrganizerController],
  providers: [OrganizerService],
})
export class OrganizerModule {}
