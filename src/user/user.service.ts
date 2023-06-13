import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Group, User } from './entities';
import { stepService } from './types';
import { ContactInfoService, PersonalService } from './services';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Group)
    private groupRepository: Repository<Group>,

    @Inject(forwardRef(() => ContactInfoService))
    private contactInfoService: ContactInfoService,
    @Inject(forwardRef(() => PersonalService))
    private personalService: PersonalService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ username: 'emi', group: [] });

    // const group = this.groupRepository.create({
    //   name: 'friends',
    //   people: [],
    //   user: { id: '' },
    // });

    // await this.groupRepository.save(group);
    return 'This action adds a new user';
  }

  stepFollower(step: number, dto: any) {
    const { service } = stepService[step - 1];
    console.log('got into the stepFollower');

    this[service].findAll();
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
