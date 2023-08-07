import { Inject, Injectable, forwardRef } from '@nestjs/common';
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

  private async create() {
    const { email: user } = this.request.user;
    await this.organizerModel.create({ user });
  }

  async addToOrganizerManager(organizerDto: OrganizerDto) {
    try {
      const organizer: Organizer[] = [];

      for (const key in organizerDto) {
        organizer.push(await this.addToOrganizer(key, organizerDto));
      }
      return organizer.pop();
    } catch (error) {
      this.create();
      return this.addToOrganizerManager(organizerDto);
    }
  }

  private async addToOrganizer(key: string, data: OrganizerDto) {
    const { email: user } = this.request.user;
    const organizer = await this.organizerModel.findOneAndUpdate(
      { user },
      {
        $push: {
          [key]: { ...data[key], createdAt: new Date() },
        },
      },
      { new: true },
    );
    console.log(data);
    if (!organizer) throw new Error('No organizer in database.');
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
