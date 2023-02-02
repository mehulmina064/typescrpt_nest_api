import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { STORAGE_TYPE } from 'src/common/enums/common.enum';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';
import { Products } from '../products/products.model';

@Table({ tableName: 'product_manufaturer_logistics' })
export class ProductManufaturerLogistics extends Model<ProductManufaturerLogistics> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @Column({
    type: DataType.DOUBLE,
    field: 'pack_of'
  })
  packOf: number;

  @Column({
    type: DataType.DOUBLE,
    field: 'length_inches'
  })
  lengthInches: number;


  @Column({
    type: DataType.DOUBLE,
    field: 'width_inches'
  })
  widthInches: number;

  @Column({
    type: DataType.DOUBLE,
    field: 'height'
  })
  height: number;

  @Column({
    type: DataType.DOUBLE,
    field: 'weight'
  })
  weight: number;

  @Column({
    type: DataType.STRING,
    field: 'storage_type'
  })
  storageType: STORAGE_TYPE;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;


  @ForeignKey(() => Products)
  @Column({
    type: DataType.INTEGER,
    field: 'product_id',
  })
  productId: number;

  @BelongsTo(() => Products, 'productId')
  product: Products;

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
