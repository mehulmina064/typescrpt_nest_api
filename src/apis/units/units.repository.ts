import { Units } from './units.model';

export const UNITS_REPOSITORY = 'UNITS_REPOSITORY';

export const UnitsRepository = {
  provide: UNITS_REPOSITORY,
  useValue: Units,
};
