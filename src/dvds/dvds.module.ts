import { Module } from '@nestjs/common';
import { DvdsService } from './dvds.service';
import { DvdsController } from './dvds.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DvdsController],
  providers: [DvdsService],
  exports: [DvdsService],
})
export class DvdsModule {}
