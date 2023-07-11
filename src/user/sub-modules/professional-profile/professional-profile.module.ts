import { Module } from '@nestjs/common';
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
  imports: [],
  controllers: [ProfessionalProfileController],
  providers: [ProfessionalProfileService],
  exports: [ProfessionalProfileService],
})
export class ProfessionalProfileModule {}
