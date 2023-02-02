import { Address } from './address.model';

export const ADDRESS_REPOSITORY = 'ADDRESS_REPOSITORY';

export const AddressRepository = {
  provide: ADDRESS_REPOSITORY,
  useValue: Address,
};
