import { UserManufactureMap } from './user-manufacture-map.model';

export const USERMANUFACTUREMAP_REPOSITORY = 'USERMANUFACTUREMAP_REPOSITORY';

export const UserManufactureMapRepository = {
  provide: USERMANUFACTUREMAP_REPOSITORY,
  useValue: UserManufactureMap,
};
