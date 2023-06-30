import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { AlsModule } from './als/als.module';

@Module({
  imports: [AlsModule],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
