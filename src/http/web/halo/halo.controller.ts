import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('halo')
export class HaloController {
  @Get()
  tes() {
    return 'halo';
  }
}
