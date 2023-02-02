import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';
import { Products } from '../products/products.model';

@Table({ tableName: 'product_manufacturer_maps' })
export class ProductManufacturerMap extends Model<ProductManufacturerMap> {
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


  @Column({
    type: DataType.INTEGER,
    field: 'lead_time',
    allowNull:false,
    defaultValue: 1

  })
  leadTime: number;

  @Column({
    type: DataType.BOOLEAN,
    field: 'ready_stock',
    allowNull:false

  })
  readyStock: boolean;

  @Column({
    type: DataType.INTEGER,
    field: 'price',
    // allowNull:false,
    // defaultValue: 0

  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    field: 'moq',
    allowNull:false

  })
  moq: number;


  @Column({
    type: DataType.DOUBLE,
    field: 'length'
  })
  length: number;


  @Column({
    type: DataType.DOUBLE,
    field: 'width'
  })
  width: number;

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
    type: DataType.BOOLEAN,
    field: 'fragile'
  })
  fragile: boolean;



  @Column({
    type: DataType.BOOLEAN,
    field: 'biodegradable'
  })
  biodegradable: boolean;


  @Column({
    type: DataType.STRING,
    field: 'vendor_sku_id',
  })
  vendorSkuId: string;


  @Column({
    type: DataType.JSONB,
    field: 'vendor_sku_images',
  })
  vendorSkuImages: string[];


    
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
