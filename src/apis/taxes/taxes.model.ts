import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';

@Table({ tableName: 'taxes' })
export class Taxes extends Model<Taxes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;


  @Column({
    type: DataType.STRING,
    field: 'tax_id'
  })
  taxId: string;

  @Column({
    type: DataType.STRING,
    field: 'tax_name'
  })
  taxName: string;

  @Column({
    type: DataType.STRING,
    field: 'tax_percentage'
  })
  taxPercentage: string;

  @Column({
    type: DataType.STRING,
    field: 'tax_type'
  })
  taxType: string;


  @Column({
    type: DataType.STRING,
    field: 'tax_specific_type'
  })
  taxSpecificType: string;


  @Column({
    type: DataType.STRING,
    field: 'is_default_tax'
  })
  isDefaultTax: string;


  @Column({
    type: DataType.STRING,
    field: 'is_editable'
  })
  isEditable: string;



  @Column({
    type: DataType.STRING,
    field: 'tax_specification'
  })
  taxSpecification: string;
  


  @Column({
    type: DataType.STRING,
    field: 'diff_rate_reason'
  })
  diffRateReason: string;
  
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;

    
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
