import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Group, LikesAndDislikes, ProfessionalProfile } from './';
import { StatusType } from '../types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  status: StatusType;

  @OneToMany(() => Group, (group) => group.user)
  group: Group[];

  @OneToOne(
    () => ProfessionalProfile,
    (professionalProfile) => professionalProfile.user,
    {
      cascade: true,
      nullable: true,
    },
  )
  professionalProfile: ProfessionalProfile;

  @OneToMany(
    () => LikesAndDislikes,
    (likesAndDislikes) => likesAndDislikes.user,
    {
      cascade: true,
      nullable: true,
    },
  )
  likesAndDislikes: LikesAndDislikes[];
}
