import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrganizerDto } from './dto/organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { RequestWidhUser } from 'src/common/interfaces';

import { Organizer } from './schemas';
import { UpdateNoteDto, UpdateTaskDto } from './dto';

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
      await this.create();
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

    if (!organizer) throw new Error('No organizer in database.');
    return organizer;
  }

  findAll() {
    return `This action returns all organizer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizer`;
  }

  async updateDataManager(updateOrganizerDto: UpdateOrganizerDto) {
    const organizer: Organizer[] = [];

    for (const key in updateOrganizerDto) {
      if (key !== 'createdAt')
        organizer.push(await this.update(key, updateOrganizerDto));
    }

    return organizer;
  }

  private async update(key: string, updateOrganizerDto: UpdateOrganizerDto) {
    const { email: user } = this.request.user;
    const fields = this.updateFieldsManager(key, updateOrganizerDto[key]);

    const toUpdate = await this.organizerModel.findOneAndUpdate(
      { user, [`${key}.createdAt`]: updateOrganizerDto.createdAt },
      { $set: fields },
      { new: true },
    );

    return toUpdate;
  }

  updateFieldsManager(property: string, data: UpdateNoteDto | UpdateTaskDto) {
    const fields: any = {};

    for (const key in data) {
      fields[`${property}.$.${key}`] = data[key];
    }
    return fields;
  }

  remove(id: number) {
    return `This action removes a #${id} organizer`;
  }
}
