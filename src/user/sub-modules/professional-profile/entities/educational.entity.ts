import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Institution, ProfessionalProfile } from '.';

@Entity()
export class Educational {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    () => ProfessionalProfile,
    (professionalProfile) => professionalProfile.educational,
  )
  professionalProfile: ProfessionalProfile;

  @OneToMany(() => Institution, (institution) => institution.educational)
  school: Institution;

  @OneToMany(() => Institution, (institution) => institution.educational)
  course: Institution;
}
