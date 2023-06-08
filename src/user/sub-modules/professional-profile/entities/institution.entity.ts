import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Educational, Job, Professional } from './';

@Entity()
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  startingDate: string;

  @Column()
  finishingDate: string;

  @ManyToOne(
    () => Educational,
    (educational) => educational.school || educational.course,
    { nullable: true },
  )
  educational: Educational;

  @ManyToOne(() => Job, (job) => job.previousJob || job.currentJob, {
    nullable: true,
  })
  job: Educational;

  @ManyToOne(() => Professional, (professional) => professional.internship, {
    nullable: true,
  })
  professional: Professional;
}
