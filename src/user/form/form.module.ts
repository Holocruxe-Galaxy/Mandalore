import { Module, forwardRef } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { ContactInfoModule, PersonalModule, UserModule } from '../modules';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => ContactInfoModule),
    forwardRef(() => PersonalModule),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
