import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { OrganizerDto } from './dto/organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@Controller()
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @Post()
  create(@Body() organizerDto: OrganizerDto) {
    return this.organizerService.addToOrganizerManager(organizerDto);
  }

  @Get()
  findAll() {
    return this.organizerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizerDto: UpdateOrganizerDto,
  ) {
    return this.organizerService.update(+id, updateOrganizerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizerService.remove(+id);
  }
}
