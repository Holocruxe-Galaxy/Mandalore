import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrganizerDto } from './dto/organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { RequestWidhUser } from 'src/common/interfaces';

import { Organizer } from './schemas';

@Injectable()
export class OrganizerService {
  constructor(
    @Inject(REQUEST) private request: RequestWidhUser,
    @InjectModel(Organizer.name)
    private readonly organizerModel: Model<Organizer>,
  ) {}

  private async create(user: string) {
    await this.organizerModel.create({ user });
  }

  async addToOrganizer(organizerDto: OrganizerDto) {
    const { email: user } = this.request.user;
    const organizer = await this.organizerModel.findOneAndUpdate(
      { user },
      { testing: true },
    );

    if (!organizer) {
      this.create(user);
      return this.addToOrganizer(organizerDto);
    }
    return organizer;
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
