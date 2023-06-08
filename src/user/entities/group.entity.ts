import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './';
import { People } from '../interfaces';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.group)
  user: User;

  @Column()
  name: string;

  @Column('json')
  people: People[];
}
