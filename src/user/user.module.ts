import { Module, forwardRef } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities';
import {
  ContactInfoModule,
  FormModule,
  GroupModule,
  LikesAndDislikesModule,
  LocationModule,
  MedicalModule,
  PersonalModule,
  ProfessionalProfileModule,
  ShoppingModule,
} from './modules';
import { routes } from './routes';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => ContactInfoModule),
    GroupModule,
    LikesAndDislikesModule,
    LocationModule,
    MedicalModule,
    forwardRef(() => PersonalModule),
    ProfessionalProfileModule,
    ShoppingModule,
    FormModule,
    RouterModule.register(routes),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
