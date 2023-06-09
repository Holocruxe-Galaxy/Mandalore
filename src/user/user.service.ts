import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Group, User } from './entities';
import { People } from './sub-modules/group/interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // const user = this.userRepository.create({ username: 'emi', group: [] });

    // const group = this.groupRepository.create({
    //   name: 'friends',
    //   people: [],
    //   user: { id: '' },
    // });

    // await this.groupRepository.save(group);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
