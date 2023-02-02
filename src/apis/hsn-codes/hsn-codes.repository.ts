import { HsnCodes } from './hsn-codes.model';

export const HSNCODES_REPOSITORY = 'HSNCODES_REPOSITORY';

export const HsnCodesRepository = {
  provide: HSNCODES_REPOSITORY,
  useValue: HsnCodes,
};
