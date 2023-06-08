import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Group, User } from './entities';
import { People } from './sub-modules/group/interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // const username = createUserDto.username;

    // const user = this.userRepository.create({
    //   group: [
    //     this.groupRepository.create({
    //       name: createUserDto.group,
    //       people: [],
    //     }),
    //     this.groupRepository.create({
    //       name: 'fulbo',
    //       people: [],
    //     }),
    //   ],
    //   username,
    // });

    // const user = this.userRepository.create({ username: 'pancho', group: [] });
    // await this.userRepository.save(user);

    const user = await this.userRepository.update(
      '41e8a80e-34ea-4380-92b7-c57bbeec8bae',
      {
        group: [
          this.groupRepository.create({
            name: 'fulbo',
            people: [],
          }),
        ],
      },
    );
    console.log(user);

    // const juan: People = {
    //   name: 'Juan',
    // };

    // const carlos: People = {
    //   name: 'Carlos',
    //   contactLink: 'http://carlos.com',
    // };

    // const peopleGroup = await this.groupRepository.find({
    //   relations: ['user'],
    //   where: { user: { id: user.id } },
    // });
    // peopleGroup[0].people.push(juan);
    // peopleGroup[1].people.push(carlos);
    // peopleGroup.map(async (foo) => {
    //   await this.groupRepository.update(foo.id, {
    //     people: foo.people,
    //   });
    // });
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
