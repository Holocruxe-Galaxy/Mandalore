import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import {
  DailyTravelling,
  DailyTravellingSchema,
  Location,
  LocationSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Location.name,
        schema: LocationSchema,
      },
      {
        name: DailyTravelling.name,
        schema: DailyTravellingSchema,
      },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
