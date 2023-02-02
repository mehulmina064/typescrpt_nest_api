import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'purchase_orders' })
export class PurchaseOrder extends Model<PurchaseOrder> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  


  @Column({
    type: DataType.STRING,
    field: 'purchaseorder_id'
  })
  purchaseorderId: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true

  })
  isActive: boolean;

  @Column({
    type: DataType.STRING,
    field: 'purchaseorder_number'
  })
  purchaseorderNumber: string;
    

  @Column({
    type: DataType.DATE,
    field: 'date'
  })
  date: string;

  @Column({
    type: DataType.DATE,
    field: 'expected_delivery_date'
  })
  expectedDeliveryDate: string;

  @Column({
    type: DataType.DATE,
    field: 'date_formatted'
  })
  dateFormatted: string;


  @Column({
    type: DataType.DATE,
    field: 'expected_delivery_date_formatted'
  })
  expectedDeliveryDateFormatted: string;


  @Column({
    type: DataType.DATE,
    field: 'delivery_date_formatted'
  })
  deliveryDateFormatted: string;


  @Column({
    type: DataType.DATE,
    field: 'status_formatted'
  })
  statusFormatted: string;



  @Column({
    type: DataType.INTEGER,
    field: 'billed_status'
  })
  billedStatus: number;



  @Column({
    type: DataType.BOOLEAN,
    field: 'is_emailed'
  })
  isEmailed: boolean;



  @Column({
    type: DataType.BOOLEAN,
    field: 'is_inclusive_tax'
  })
  isInclusiveTax: boolean;



  @Column({
    type: DataType.BOOLEAN,
    field: 'is_backorder'
  })
  isBackorder: boolean;



  @Column({
    type: DataType.STRING,
    field: 'reference_number'
  })
  reference_number: string;



  @Column({
    type: DataType.STRING,
    field: 'status'
  })
  status: string;



  @Column({
    type: DataType.STRING,
    field: 'vendor_id'
  })
  vendorId: string;



  @Column({
    type: DataType.STRING,
    field: 'vendor_name'
  })
  vendorName: string;



  @Column({
    type: DataType.STRING,
    field: 'contact_persons'
  })
  contactPersons: string;



  @Column({
    type: DataType.STRING,
    field: 'currency_id'
  })
  currencyId: string;




  @Column({
    type: DataType.STRING,
    field: 'currency_code'
  })
  currencyCode: string;




  @Column({
    type: DataType.STRING,
    field: 'currency_symbol'
  })
  currencySymbol: string;




  @Column({
    type: DataType.INTEGER,
    field: 'exchange_rate'
  })
  exchangeRate: number;




  @Column({
    type: DataType.DATE,
    field: 'delivery_date'
  })
  deliveryDate: string;




  @Column({
    type: DataType.STRING,
    field: 'salesorder_id'
  })
  salesorderId: string;





  @Column({
    type: DataType.BOOLEAN,
    field: 'is_drop_shipment'
  })
  isDropShipment: boolean;





  @Column({
    type: DataType.INTEGER,
    field: 'sub_total'
  })
  subTotal: number;





  @Column({
    type: DataType.DATE,
    field: 'sub_total_formatted'
  })
  sub_total_formatted: string;





  // @Column({
  //   type: DataType.DATE,
  //   field: 'delivery_date'
  // })
  // deliveryDate: string;





  // @Column({
  //   type: DataType.DATE,
  //   field: 'delivery_date'
  // })
  // deliveryDate: string;





  // @Column({
  //   type: DataType.DATE,
  //   field: 'delivery_date'
  // })
  // deliveryDate: string;





  // @Column({
  //   type: DataType.DATE,
  //   field: 'delivery_date'
  // })
  // deliveryDate: string;





  // @Column({
  //   type: DataType.DATE,
  //   field: 'delivery_date'
  // })
  // deliveryDate: string;





  // @Column({
  //   type: DataType.DATE,
  //   field: 'delivery_date'
  // })
  // deliveryDate: string;





  // @Column({
  //   type: DataType.DATE,
  //   field: 'delivery_date'
  // })
  // deliveryDate: string;





  // @Column({
  //   type: DataType.DATE,
  //   field: 'delivery_date'
  // })
  // deliveryDate: string;





  // @Column({
  //   type: DataType.DATE,
  //   field: 'delivery_date'
  // })
  // deliveryDate: string;




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
