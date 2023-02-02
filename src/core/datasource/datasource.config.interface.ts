import { SequelizeOptions } from 'sequelize-typescript';

export interface ICanDatasourceConfig {
  dataSourceConfiguration: ICanDatasourceConfigAttributes;
}

export interface ICanDatasourceConfigAttributes extends SequelizeOptions {
  // dialect?: string;
  // host?: string;
  // port?: number;
  // username?: string;
  // password?: string;
  // database?: string;
}
