import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Group, LikesAndDislikes, ProfessionalProfile } from './';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @OneToMany(() => Group, (group) => group.user, { cascade: true, eager: true })
  group: Group[];

  @OneToMany(
    () => ProfessionalProfile,
    (professionalProfile) => professionalProfile.user,
    {
      cascade: true,
      eager: true,
    },
  )
  professionalProfile: ProfessionalProfile[];

  @OneToMany(
    () => LikesAndDislikes,
    (likesAndDislikes) => likesAndDislikes.user,
    {
      cascade: true,
      eager: true,
    },
  )
  likesAndDislikes: LikesAndDislikes[];
}
