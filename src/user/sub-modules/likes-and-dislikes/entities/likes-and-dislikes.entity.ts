import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/entities';
import { Activity, Interest } from './';

@Entity()
export class LikesAndDislikes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likesAndDislikes)
  user: User;

  @OneToMany(() => Activity, (activity) => activity.likesAndDislikes)
  activity: Activity[];

  @OneToMany(() => Interest, (interest) => interest.likesAndDislikes)
  interest: Interest[];
}
