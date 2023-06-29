import { Module, forwardRef } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './schemas';
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
import { MongooseModule } from '@nestjs/mongoose';
import { routes } from './routes';
import { UserSchema } from './schemas/user.schema';

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
