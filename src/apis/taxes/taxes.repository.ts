import { Taxes } from './taxes.model';

export const TAXES_REPOSITORY = 'TAXES_REPOSITORY';

export const TaxesRepository = {
  provide: TAXES_REPOSITORY,
  useValue: Taxes,
};
