import { RolePermission } from './role-permission.model';

export const ROLEPERMISSION_REPOSITORY = 'ROLEPERMISSIONS_REPOSITORY';

export const RolePermissionsRepository = {
  provide: ROLEPERMISSION_REPOSITORY,
  useValue: RolePermission,
};
