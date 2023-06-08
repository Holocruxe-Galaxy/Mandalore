import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfessionalProfile, Group, LikesAndDislikes, User } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfessionalProfile,
      Group,
      LikesAndDislikes,
      User,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
