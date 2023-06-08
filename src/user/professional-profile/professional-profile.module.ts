import { Module } from '@nestjs/common';
import { ProfessionalProfileService } from './professional-profile.service';
import { ProfessionalProfileController } from './professional-profile.controller';

@Module({
  controllers: [ProfessionalProfileController],
  providers: [ProfessionalProfileService],
})
export class ProfessionalProfileModule {}
