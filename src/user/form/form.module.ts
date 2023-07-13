import { Module, forwardRef } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from '../user.module';

@Module({
  imports: [forwardRef(() => UserModule), CommonModule],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
