import { Bid } from './bid.model';

export const BID_REPOSITORY = 'BID_REPOSITORY';

export const BidRepository = {
  provide: BID_REPOSITORY,
  useValue: Bid,
};
