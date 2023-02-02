import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'hsn_codes' })
export class HsnCodes extends Model<HsnCodes> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    // primaryKey: true,
    unique: true,
    field: 'hsn_code'
  })
  hsnCode: string;
  
      
  @Column({
    type: DataType.TEXT,
    field: 'description'
  })
  description: string; 
      
  @Column({
    type: DataType.FLOAT,
    field: 'cgst'
  })
  cgst: number; 
      
  @Column({
    type: DataType.FLOAT,
    field: 'sgst'
  })
  sgst: number; 
      
  @Column({
    type: DataType.FLOAT,
    field: 'igst'
  })
  igst: number; 
      
  @Column({
    type: DataType.FLOAT,
    field: 'compensation_cess'
  })
  compensationCess: number;
    
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
