import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {
  ProfessionalProfile,
  Group,
  LikesAndDislikes,
  User,
  Personal,
} from './entities';
import {
  ContactInfoModule,
  GroupModule,
  LikesAndDislikesModule,
  LocationModule,
  MedicalModule,
  PersonalModule,
  ProfessionalProfileModule,
  ShoppingModule,
} from './modules';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Group,
      LikesAndDislikes,
      Personal,
      ProfessionalProfile,
      User,
    ]),
    forwardRef(() => ContactInfoModule),
    GroupModule,
    LikesAndDislikesModule,
    LocationModule,
    MedicalModule,
    forwardRef(() => PersonalModule),
    ProfessionalProfileModule,
    ShoppingModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
