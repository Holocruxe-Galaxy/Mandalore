import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Group, User } from './entities/index.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const group: Group = this.groupRepository.create({
      name: createUserDto.group,
    });

    await this.groupRepository.insert(group);

    console.log(group);

    const username = createUserDto.username;

    this.userRepository.create();
    const user = this.userRepository.create({ group, username });

    console.log('first try: ', user);
    const hola = await this.userRepository.save(user);
    console.log('hola, ', hola);
    const justCreated = await this.userRepository.findBy({ id: user.id });
    console.log('second try: ', user);
    console.log('third try: ', justCreated);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
