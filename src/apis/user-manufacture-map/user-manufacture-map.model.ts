import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';
import { USER_MANUFACTURE_MAP_TYPE } from './user-manufacture-map.dto';

@Table({ tableName: 'user_manufacture_maps' })
export class UserManufactureMap extends Model<UserManufactureMap> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  // @Column({
  //   type: DataType.STRING,
  //   field: 'status',
  //   defaultValue:'active'
  // })
  // status: 'active' | 'inactive';
    
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;

   @Column({
    type: DataType.STRING,
    field: 'work_phone'
  })
  workPhone: string;

  @Column({
    type: DataType.STRING,
    field: 'work_email'
  })
  workEmail: string;

  @Column({
    type: DataType.STRING,
    field: 'designation',
    allowNull: true
  })
  designation: string;
  
  @Column({
    type: DataType.STRING,
    field: 'department',
    allowNull: true
  })
  department: string;

  @Column({
    type: DataType.STRING,
    field: 'type',
    allowNull: true
  })
  type: USER_MANUFACTURE_MAP_TYPE;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
    
  
  @ForeignKey(() => Manufacturer)
  @Column({
    type: DataType.INTEGER,
    field: 'manufacturer_id',
  })
  manufacturerId: number;

  @BelongsTo(() => Manufacturer, 'manufacturerId')
  manufacturer: Manufacturer;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'created_by_id',
  })
  createdById: number;

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'updated_by_id',
  })
  updatedById: number;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;
}
