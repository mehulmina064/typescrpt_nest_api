import { Sequelize } from 'sequelize-typescript';
import { SEQUALIZE_DATABASE_PROVIDER } from '../constants/app.constant';
import { CanDataSourceConfig } from './datasource.config';

export const CAN_DATASOURCE_PROVIDERS = [
  {
    provide: SEQUALIZE_DATABASE_PROVIDER,
    useFactory: async (canDataSourceConfig: CanDataSourceConfig) => {
      const sequelize = new Sequelize({
        ...canDataSourceConfig.dataSourceConfiguration,
      });
      await sequelize.sync();
      return sequelize;
    },
    inject: [CanDataSourceConfig],
  },
];
