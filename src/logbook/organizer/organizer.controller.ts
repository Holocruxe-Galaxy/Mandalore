import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrganizerService } from './organizer.service';
import { OrganizerDto, UpdateOrganizerDto } from './dto';
import { ParseParamPipe } from './pipes';
import { OrganizerParamsType } from './types';

@ApiTags('Logbook - Organizer')
@Controller()
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @Post()
  create(@Body() organizerDto: OrganizerDto) {
    return this.organizerService.addToOrganizerManager(organizerDto);
  }

  @Get(':prop')
  findAll(@Param('prop', ParseParamPipe) prop: OrganizerParamsType) {
    return this.organizerService.findAll(prop);
  }

  @Patch()
  update(@Body() updateOrganizerDto: UpdateOrganizerDto) {
    return this.organizerService.updateDataManager(updateOrganizerDto);
  }

  @Delete(':prop')
  remove(
    @Param('prop', ParseParamPipe) prop: OrganizerParamsType,
    @Body() updateOrganizerDto: UpdateOrganizerDto,
  ) {
    return this.organizerService.remove(prop, updateOrganizerDto);
  }
}
