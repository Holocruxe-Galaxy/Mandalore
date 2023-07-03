import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { ContactInfo } from './schemas/contact-info.schema';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectModel(ContactInfo.name)
    private contactInfoModel: Model<ContactInfo>,
  ) {}
  async create(createContactInfoDto: CreateContactInfoDto): Promise<ObjectId> {
    const { _id } = await this.contactInfoModel.create(createContactInfoDto);

    return _id;
  }

  findAll() {
    return `This action returns all contactInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactInfo`;
  }

  update(id: number, updateContactInfoDto: UpdateContactInfoDto) {
    return `This action updates a #${id} contactInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactInfo`;
  }
}
