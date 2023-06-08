import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfessionalProfile, Group, LikesAndDislikes, User } from './entities';
import { ProfessionalProfileModule } from './professional-profile/professional-profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfessionalProfile,
      Group,
      LikesAndDislikes,
      User,
    ]),
    ProfessionalProfileModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
