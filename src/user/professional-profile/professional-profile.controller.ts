import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessionalProfileService } from './professional-profile.service';
import { CreateProfessionalProfileDto } from './dto/create-professional-profile.dto';
import { UpdateProfessionalProfileDto } from './dto/update-professional-profile.dto';

@Controller('professional-profile')
export class ProfessionalProfileController {
  constructor(
    private readonly professionalProfileService: ProfessionalProfileService,
  ) {}

  @Post()
  create(@Body() createProfessionalProfileDto: CreateProfessionalProfileDto) {
    return this.professionalProfileService.create(createProfessionalProfileDto);
  }

  @Get()
  findAll() {
    return this.professionalProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfessionalProfileDto: UpdateProfessionalProfileDto,
  ) {
    return this.professionalProfileService.update(
      +id,
      updateProfessionalProfileDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalProfileService.remove(+id);
  }
}
