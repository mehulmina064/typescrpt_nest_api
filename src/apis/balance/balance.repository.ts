import { Balance } from './balance.model';

export const BALANCE_REPOSITORY = 'BALANCE_REPOSITORY';

export const BalanceRepository = {
  provide: BALANCE_REPOSITORY,
  useValue: Balance,
};
