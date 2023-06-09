import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalProfileService } from './professional-profile.service';
import { ProfessionalProfileController } from './professional-profile.controller';
import {
  Educational,
  Institution,
  Job,
  Professional,
  ProfessionalProfile,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Educational,
      Institution,
      Job,
      Professional,
      ProfessionalProfile,
    ]),
  ],
  controllers: [ProfessionalProfileController],
  providers: [ProfessionalProfileService],
})
export class ProfessionalProfileModule {}
