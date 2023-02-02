import { Module } from '@nestjs/common';
import { CanPermissionsService } from './permissions.service';

@Module({
  providers: [CanPermissionsService],
  exports: [CanPermissionsService],
})
export class CanPermissionModule {}
