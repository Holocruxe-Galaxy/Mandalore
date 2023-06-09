import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities';
import { LikesAndDislikes } from './';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  field: string;

  @Column()
  schedule: string;

  @Column({ nullable: true })
  genre: string;

  @Column('simple-array', { nullable: true })
  units: string[];

  @ManyToOne(() => User, (user) => user.likesAndDislikes)
  user: User;

  @ManyToOne(
    () => LikesAndDislikes,
    (likesAndDislikes) => likesAndDislikes.interest,
  )
  likesAndDislikes: LikesAndDislikes;
}
