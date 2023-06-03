import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Group, (group) => group.name)
  group: Group[];
}
