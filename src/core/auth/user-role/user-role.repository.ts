import { UserRole } from './user-role.model';

export const USERROLE_REPOSITORY = 'USERROLES_REPOSITORY';

export const UserRoleRepository = {
  provide: USERROLE_REPOSITORY,
  useValue: UserRole,
};
