import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Permission } from '../permission/permission.model';
import { Role } from '../role/role.model';

@Table({ tableName: 'role_permission' })
export class RolePermission extends Model<RolePermission> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, field: 'role_id' })
  roleId: number;

  @BelongsTo(() => Role, 'roleId')
  role: Role;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER, field: 'permission_id' })
  permissionId: number;

  @BelongsTo(() => Permission, 'permissionId')
  permission: Permission;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;
}
