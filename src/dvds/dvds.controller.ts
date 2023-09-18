import { Controller } from '@nestjs/common';
import { DvdsService } from './dvds.service';

@Controller('dvds')
export class DvdsController {
  constructor(private readonly dvdsService: DvdsService) {}
}
