import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Group, LikesAndDislikes, ProfessionalProfile } from './';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @OneToMany(() => Group, (group) => group.user, {
    nullable: true,
  })
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
