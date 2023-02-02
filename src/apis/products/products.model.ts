import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'products' })
export class Products extends Model<Products> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
   
  @Column({
    type: DataType.STRING,
    field: 'name',
    allowNull:false
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    field: 'description',
  })
  description: string;

  @Column({
    type: DataType.STRING,
    field: 'super_category',
    allowNull:false

  })
  superCategory: string;

  @Column({
    type: DataType.STRING,
    field: 'category',
    allowNull:false

  })
  category: string;

  @Column({
    type: DataType.STRING,
    field: 'sub_category',
    allowNull:false

  })
  subCategory: string;

  @Column({
    type: DataType.STRING,
    field: 'sub_sub_category',
    allowNull:false

  })
  subSubCategory: string;

  @Column({
    type: DataType.STRING,
    field: 'sku',
    allowNull:false

  })
  sku: string;


  @Column({
    type: DataType.INTEGER,
    field: 'pimcore_id',
    allowNull:false

  })
  pimcoreId: number;



  @Column({
    type: DataType.STRING,
    field: 'country_of_origin',
    allowNull:false

  })
  countryOfOrigin: string;


  // @Column({
  //   type: DataType.INTEGER,
  //   field: 'moq',
  //   allowNull:false

  // })
  // moq: number;

  @Column({
    type: DataType.STRING,
    field: 'unit',
    allowNull:false

  })
  unit: string;

  @Column({
    type: DataType.STRING,
    field: 'brand'
  })
  brand: string;

  @Column({
    type: DataType.STRING,
    field: 'model_no',
  })
  modelNo: string;

  @Column({
    type: DataType.STRING,
    field: 'intra_state_tax_rate',
  })
  intraStateTaxRate: string;

  @Column({
    type: DataType.STRING,
    field: 'inter_state_tax_rate',
  })
  interStateTaxRate: string;

  @Column({
    type: DataType.JSONB,
    field: 'product_images',
    allowNull:false

  })
  productImages: string[];


  @Column({
    type: DataType.STRING,
    field: 'hsn_code',
    allowNull: true,
  })
  hsnCode: string;



  // @Column({
  //   type: DataType.INTEGER,
  //   field: 'upc',
  // })
  // upc: number;


  // @Column({
  //   type: DataType.STRING,
  //   field: 'mpn'

  // })
  // mpn: string;

  // @Column({
  //   type: DataType.INTEGER,
  //   field: 'ean'

  // })
  // ean: number;

  // @Column({
  //   type: DataType.INTEGER,
  //   field: 'isbn'

  // })
  // isbn: number;


  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'made_to_order',
  //   allowNull:false

  // })
  // madeToOrder: boolean;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'white_labeled',
  //   allowNull:false

  // })
  // whiteLabeled: boolean;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'green_product'
  // })
  // greenProduct: boolean;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'eco_friendly'
  // })
  // ecoFriendly: boolean;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'prodo_exclusive',
  //   allowNull:false

  // })
  // prodoExclusive: boolean;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'track_inventory',
  //   allowNull:false

  // })
  // trackInventory: boolean;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'returnable',
  //   allowNull:false

  // })
  // returnable: boolean;


  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'goods_or_service',
  //   allowNull:false

  // })
  // goodsOrService: boolean;



  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'advanced_inventory_tracking'
  // })
  // advancedInventoryTracking: boolean;

  // @Column({
  //   type: DataType.STRING,
  //   field: 'client_sku_id',
  // })
  // clientSkuId: string;

  // @Column({
  //   type: DataType.TEXT,
  //   field: 'sales_description',
  // })
  // salesDescription: string;


  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'track_batches'
  // })
  // trackBatches: boolean;


  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'activity_status'
  // })
  // activityStatus: boolean;

  // @Column({
  //   type: DataType.STRING,
  //   field: 'fulfilment'
  // })
  // fulfilment: string;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'purchase_information',
  //   allowNull:false

  // })
  // purchaseInformation: boolean;


  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'sales_information',
  //   allowNull:false

  // })
  // salesInformation: boolean;

  // @Column({
  //   type: DataType.STRING,
  //   field: 'tax_preference',
  // })
  // taxPreference: string;


  // @Column({
  //   type: DataType.STRING,
  //   field: 'intra_state_tax_name'
  // })
  // intraStateTaxName: string;

  // @Column({
  //   type: DataType.DOUBLE,
  //   field: 'selling_price'
  // })
  // sellingPrice: number;


  // @Column({
  //   type: DataType.DOUBLE,
  //   field: 'cost_price'
  // })
  // costPrice: number;

  // @Column({
  //   type: DataType.STRING,
  //   field: 'purchase_account'
  // })
  // purchaseAccount: string;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   field: 'one_time_use'
  // })
  // oneTimeUse: boolean;

  // @Column({
  //   type: DataType.STRING,
  //   field: 'sales_account',
  // })
  // salesAccount: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;



  @Column({
    type: DataType.STRING,
    field: 'zoho_id'
  })
  zohoId: string;
    
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
