import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';
import { User } from 'src/user/entities';
import { CivilStatusType, GenderType } from '../types';

@Entity()
export class Personal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.personal)
  user: User;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  gender: GenderType;

  @Column()
  birthdate: string;

  @Column()
  civilStatus: CivilStatusType;
}
