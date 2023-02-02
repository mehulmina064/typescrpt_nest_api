import { Rfq } from './rfq.model';

export const RFQ_REPOSITORY = 'RFQ_REPOSITORY';

export const RfqRepository = {
  provide: RFQ_REPOSITORY,
  useValue: Rfq,
};
