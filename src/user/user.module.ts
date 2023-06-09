import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfessionalProfile, Group, LikesAndDislikes, User } from './entities';
import {
  ContactInfoModule,
  GroupModule,
  LikesAndDislikesModule,
  LocationModule,
  MedicalModule,
  ProfessionalProfileModule,
  ShoppingModule,
} from './';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Group,
      LikesAndDislikes,
      ProfessionalProfile,
      User,
    ]),
    ContactInfoModule,
    GroupModule,
    LikesAndDislikesModule,
    LocationModule,
    MedicalModule,
    ProfessionalProfileModule,
    ShoppingModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
