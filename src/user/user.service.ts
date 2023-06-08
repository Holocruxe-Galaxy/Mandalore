import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Group, User } from './entities';
import { People } from './interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const username = createUserDto.username;

    this.userRepository.create();
    const user = this.userRepository.create({
      group: [
        this.groupRepository.create({
          name: createUserDto.group,
          people: [],
        }),
        this.groupRepository.create({
          name: 'fulbo',
          people: [],
        }),
      ],
      username,
    });

    const juan: People = {
      name: 'Juan',
    };

    const carlos: People = {
      name: 'Carlos',
      contactLink: 'http://carlos.com',
    };

    // console.log('first try: ', user);
    await this.userRepository.save(user);
    // console.log('hola, ', hola);
    // console.log('second try: ', user);
    const peopleGroup = await this.groupRepository.find({
      relations: ['user'],
      where: { user: { id: user.id } },
    });
    peopleGroup[0].people.push(juan);
    peopleGroup[1].people.push(carlos);
    peopleGroup.map(async (foo) => {
      const thisAintNoWorkin = await this.groupRepository.update(foo.id, {
        people: foo.people,
      });
      console.log('This workin? ', thisAintNoWorkin);
    });
    console.log(peopleGroup[0].id);
    const uniqueGroup = await this.groupRepository.findOne({
      where: { id: peopleGroup[0].id },
    });
    console.log('hola, ¿no?', uniqueGroup);
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
