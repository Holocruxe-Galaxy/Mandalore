import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from 'src/user/entities';
import { Educational, Job, Professional } from './';

@Entity()
export class ProfessionalProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.professionalProfile)
  user: User;

  @OneToOne(
    () => Professional,
    (professional) => professional.professionalProfile,
  )
  professional: Professional;

  @OneToOne(() => Educational, (educational) => educational.professionalProfile)
  educational: Educational;

  @OneToOne(() => Job, (job) => job.professionalProfile)
  job: Job;
}
