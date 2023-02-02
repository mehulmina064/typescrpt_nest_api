import { Role } from './role.model';

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';

export const RoleRepository = {
  provide: ROLE_REPOSITORY,
  useValue: Role,
};
