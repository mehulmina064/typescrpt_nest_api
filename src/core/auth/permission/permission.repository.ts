import { Permission } from './permission.model';

export const PERMISSION_REPOSITORY = 'PERMISSION_REPOSITORY';

export const PermissionRepository = {
  provide: PERMISSION_REPOSITORY,
  useValue: Permission,
};
