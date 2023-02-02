import { Finance } from './finance.model';

export const FINANCE_REPOSITORY = 'FINANCE_REPOSITORY';

export const FinanceRepository = {
  provide: FINANCE_REPOSITORY,
  useValue: Finance,
};
