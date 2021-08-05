import { Render } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('halo')
export class HaloController {
  @Get()
  @Render('index')
  tes() {
    return {
      message: 'Halo!',
    };
  }
}
