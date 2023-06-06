import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @OneToMany(() => Group, (group) => group.name)
  group: Group;
}
