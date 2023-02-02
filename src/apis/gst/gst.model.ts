import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'gsts' })
export class Gst extends Model<Gst> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @Column({
    type: DataType.STRING,
    field: 'gst_name',
    primaryKey: true,
    unique: true,
  })
  gstName: string;  

  @Column({
    type: DataType.DOUBLE,
    field: 'cgst'
  })
  cgst: number;

  @Column({
    type: DataType.DOUBLE,
    field: 'sgst'
  })
  sgst: number;
    
  @Column({
    type: DataType.DOUBLE,
    field: 'igst'
  })
  igst: number;

  // @Column({
  //   type: DataType.STRING,
  //   field: 'status',
  //   defaultValue: 'draft'
  // })
  // status: 'active' | 'inactive';

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
