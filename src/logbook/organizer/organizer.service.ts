import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrganizerDto, UpdateOrganizerDto } from './dto';
import { RequestWidhUser } from 'src/common/interfaces';

import { Organizer } from './schemas';
import { OrganizerDtosType, OrganizerParamsType } from './types';

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
      return 'Added successfully!';
    } catch (error) {
      await this.create();
      return this.addToOrganizerManager(organizerDto);
    }
  }

  private async addToOrganizer(key: string, data: OrganizerDto) {
    const { email: user } = this.request.user;

    this.caseModifier(key, data);
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

  private caseModifier(key: string, dto: OrganizerDto) {
    if (key === 'notes') return;
    if (key === 'tasks') {
      for (const step of dto[key].steps) {
        step.done = false;
      }
    }
  }

  async findAll(prop: OrganizerParamsType) {
    const { email: user } = this.request.user;

    const entrances = await this.organizerModel.findOne({ user }).select(prop);

    return (entrances[prop] as any).filter((e: any) => !e.deletedAt);
  }

  findOne(id: number) {
    return `This action returns a #${id} organizer`;
  }

  async updateDataManager({ data }: UpdateOrganizerDto) {
    data.map(async (element) => {
      for (const key in element) {
        if (key !== 'createdAt') return await this.update(key, element);
      }
    });

    return 'Updated successfully!';
  }

  private async update(key: string, updateOrganizerDto: OrganizerDtosType) {
    const { email: user } = this.request.user;
    const fields = this.updateFieldsManager(key, updateOrganizerDto[key]);

    const toUpdate = await this.organizerModel.findOneAndUpdate(
      { user, [`${key}.createdAt`]: updateOrganizerDto.createdAt },
      { $set: fields },
      { new: true },
    );

    return toUpdate;
  }

  updateFieldsManager(property: string, data: OrganizerDtosType) {
    const fields: any = {};

    for (const key in data) {
      fields[`${property}.$.${key}`] = data[key];
    }

    return fields;
  }

  async remove(
    prop: OrganizerParamsType,
    updateOrganizerDto: UpdateOrganizerDto,
  ) {
    // const deletionDto = {
    //   createdAt: updateOrganizerDto.createdAt,
    //   [prop]: { deletedAt: new Date() },
    // };
    // await this.update(prop, deletionDto);
    // return `The ${prop} has been deleted successfully!`;
  }
}
