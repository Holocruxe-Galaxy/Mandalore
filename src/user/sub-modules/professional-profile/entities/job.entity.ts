import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Institution, ProfessionalProfile } from '.';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    () => ProfessionalProfile,
    (professionalProfile) => professionalProfile.job,
  )
  professionalProfile: ProfessionalProfile;

  @OneToMany(() => Institution, (institution) => institution.job)
  previousJob: Institution;

  @OneToMany(() => Institution, (institution) => institution.job)
  currentJob: Institution;
}
