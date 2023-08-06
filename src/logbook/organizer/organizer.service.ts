import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestWidhUser } from 'src/common/interfaces';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@Injectable()
export class OrganizerService {
  constructor(@Inject(REQUEST) private request: RequestWidhUser) {}
  create(createOrganizerDto: CreateOrganizerDto) {
    const { email: user } = this.request.user;
    return 'This action adds a new organizer';
  }

  findAll() {
    return `This action returns all organizer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizer`;
  }

  update(id: number, updateOrganizerDto: UpdateOrganizerDto) {
    return `This action updates a #${id} organizer`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizer`;
  }
}
