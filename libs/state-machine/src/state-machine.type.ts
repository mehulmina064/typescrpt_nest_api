import { CanPermissionsConfig } from 'libs/common/src';
import { Model, ModelCtor } from 'sequelize';

export interface CanStateConfig {
  name: string;
  model: ModelCtor<Model<any, any>>;
  changes: StateChange[];
}

interface StateChange {
  key: string;
  value: any;
  to: StateTo[];
  permissions?: StatePermissions;
}

interface StateTo {
  value: any;
  before?: Function[];
  after?: Function[];
}

interface StatePermissions extends CanPermissionsConfig {}
