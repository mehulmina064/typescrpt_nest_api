import { Manufacturer } from './manufacturer.model';

export const MANUFACTURER_REPOSITORY = 'MANUFACTURER_REPOSITORY';

export const ManufacturerRepository = {
  provide: MANUFACTURER_REPOSITORY,
  useValue: Manufacturer,
};
