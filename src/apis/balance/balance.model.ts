import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';

@Table({ tableName: 'balances' })
export class Balance extends Model<Balance> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  

  @Column({
    type: DataType.DOUBLE,
    field: 'opening_balance',
  })
  openingBalance: number;
  

  @Column({
    type: DataType.DOUBLE,
    field: 'closing_balance',
  })
  closingBalance: number;

  @Column({
    type: DataType.STRING,
    field: 'payment_terms',
  })
  paymentTerms: string;
  
  @Column({
    type: DataType.STRING,
    field: 'tds'
  })
  tds: string;
  
  @Column({
    type: DataType.STRING,
    field: 'price_list'
  })
  priceList: string;
  

  @Column({
    type: DataType.STRING,
    field: 'currency'
  })
  currency: string;
  
  @Column({
    type: DataType.STRING,
    field: 'source_of_supply'
  })
  sourceOfSupply: string;
  
  @Column({
    type: DataType.STRING,
    field: 'pan_uin'
  })
  panUin: string;
  
  @Column({
    type: DataType.STRING,
    field: 'gst_treatment'
  })
  gstTreatment: string;

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

    
  @ForeignKey(() => Manufacturer)
  @Column({
    type: DataType.INTEGER,
    field: 'manufacturer_id',
  })
  manufacturerId: number;

  @BelongsTo(() => Manufacturer, 'manufacturerId')
  manufacturer: Manufacturer;
}
