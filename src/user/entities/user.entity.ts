import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Group, LikesAndDislikes, Personal, ProfessionalProfile } from './';
import { StatusType } from '../types';
import { ContactInfo } from '../sub-modules/contact-info/entities/contact-info.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'PENDING' })
  status: StatusType;

  @OneToOne(() => Personal, (personal) => personal.user, {
    cascade: true,
    nullable: true,
  })
  personal: Personal;

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

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.user, {
    cascade: true,
    nullable: true,
  })
  contactInfo: ContactInfo;
}
