import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';

@Table({ tableName: 'other_products' })
export class OtherProducts extends Model<OtherProducts> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
   
  @Column({
    type: DataType.STRING,
    field: 'sku_name',
    allowNull:false
  })
  skuName: string;


  @Column({
    type: DataType.STRING,
    field: 'sku',
    // allowNull:false

  })
  sku: string;


  @Column({
    type: DataType.INTEGER,
    field: 'moq',
    // allowNull:false

  })
  moq: number;

  @Column({
    type: DataType.STRING,
    field: 'unit',
    // allowNull:false

  })
  unit: string;

  @Column({
    type: DataType.DOUBLE,
    field: 'price',
    // allowNull:false

  })
  price: number;

  @Column({
    type: DataType.TEXT,
    field: 'description',
  })
  description: string;

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

  @Column({
    type: DataType.JSONB,
    field: 'images',
    allowNull:false

  })
  images: string[];


  @Column({
    type: DataType.STRING,
    field: 'annual_unit_sold',
    allowNull: true,
  })
  annualUnitSold: string;

    
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
