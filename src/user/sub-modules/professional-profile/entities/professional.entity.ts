import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Institution, ProfessionalProfile } from './';

@Entity()
export class Professional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    () => ProfessionalProfile,
    (professionalProfile) => professionalProfile.professional,
  )
  professionalProfile: ProfessionalProfile;

  @OneToMany(() => Institution, (institution) => institution.professional)
  internship: Institution;

  @Column('simple-array')
  softSkills: string[];

  @Column('simple-array')
  hardSkills: string[];
}
