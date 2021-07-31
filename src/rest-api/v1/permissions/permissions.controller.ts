import { Controller } from '@nestjs/common';
import { PermissionsService } from 'src/cli/auth/permissions/permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
}
