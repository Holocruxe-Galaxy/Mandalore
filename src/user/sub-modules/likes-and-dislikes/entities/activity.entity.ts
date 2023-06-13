import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities';
import { LikesAndDislikes } from './';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  field: string;

  @Column()
  schedule: string;

  @Column({ nullable: true })
  companions: string;

  @Column({ nullable: true })
  additionalData: string;

  @ManyToOne(() => User, (user) => user.likesAndDislikes)
  user: User;

  @ManyToOne(
    () => LikesAndDislikes,
    (likesAndDislikes) => likesAndDislikes.activity,
  )
  likesAndDislikes: LikesAndDislikes;
}
