import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { Personal } from './entities';

@Injectable()
export class PersonalService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(Personal)
    private personalRepository: Repository<Personal>,
  ) {}
  async create(createPersonalDto: CreatePersonalDto) {
    const personal = this.personalRepository.create(createPersonalDto);
    await this.personalRepository.save(personal);
    return 'The data has been saved properly';
  }

  findAll() {
    return `This action returns all personal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personal`;
  }

  update(id: number, updatePersonalDto: UpdatePersonalDto) {
    return `This action updates a #${id} personal`;
  }

  remove(id: number) {
    return `This action removes a #${id} personal`;
  }
}
