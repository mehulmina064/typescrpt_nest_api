import { FindOptions, CountOptions } from 'sequelize';

export interface ICanCrudFilter {
  filter: FindOptions;
}

export interface ICanCrudCountFilter {
  filter: CountOptions;
}
