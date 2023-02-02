import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';

@Module({
  imports: [CommonModule],
  controllers: [GoogleController],
  providers: [GoogleService],
})
export class GoogleModule {}
