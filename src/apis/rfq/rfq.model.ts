import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Items } from 'src/common/types/items.type';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'rfqs' })
export class Rfq extends Model<Rfq> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;


  @Column({
    type: DataType.JSONB,
    field: 'items'
  })
  items: Items[];

  @Column({
    type: DataType.DATE,
    field: 'delivery_date'
  })
  deliveryDate: string;

  @Column({
    type: DataType.DATE,
    field: 'start_time'
  })
  startTime: string;

  @Column({
    type: DataType.DATE,
    field: 'end_time'
  })
  endTime: string;
  
  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue:'pending'
  })
  status: 'pending' | 'accepted' | 'rejected' ;

  @Column({
    type: DataType.STRING,
    field: 'rfq_id',
    allowNull: true,
  })
  rfqId: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;


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

