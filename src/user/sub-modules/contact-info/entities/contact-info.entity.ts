import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';
import { User } from 'src/user/entities';

@Entity()
export class ContactInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.personal)
  user: User;

  @Column()
  email: string;

  @Column()
  altEmail: string;

  @Column()
  phone: string;

  @Column()
  zipCode: string;
}
