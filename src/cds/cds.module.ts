import { Module } from '@nestjs/common';
import { CdsService } from './cds.service';
import { CdsController } from './cds.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CdsController],
  providers: [CdsService],
  exports: [CdsService],
})
export class CdsModule {}
