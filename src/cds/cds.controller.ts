import { Controller } from '@nestjs/common';
import { CdsService } from './cds.service';

@Controller('cds')
export class CdsController {
  constructor(private readonly cdsService: CdsService) {}
}
