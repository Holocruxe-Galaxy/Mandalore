import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ImagesModule } from './images/images.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [ImagesModule],
})
export class CommonModule {}
