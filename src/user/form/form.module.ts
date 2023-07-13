import { Module, forwardRef } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { ContactInfoModule, PersonalModule, UserModule } from '../modules';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => ContactInfoModule),
    forwardRef(() => PersonalModule),
    CommonModule,
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
