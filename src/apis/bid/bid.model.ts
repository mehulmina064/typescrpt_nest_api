import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Items } from 'src/common/types/items.type';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';
import { Rfq } from '../rfq/rfq.model';

@Table({ tableName: 'bids' })
export class Bid extends Model<Bid> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @Column({
    type: DataType.STRING,
    field: 'bid_id',
    allowNull: true,
  })
  bidId: string;


  @Column({
    type: DataType.DOUBLE,
    field: 'estimated_amount'
  })
  estimatedAmount: string;

  @ForeignKey(() => Manufacturer)
  @Column({
    type: DataType.INTEGER,
    field: 'manufacturer_id',
  })
  manufacturerId: number;

  @BelongsTo(() => Manufacturer, 'manufacturerId')
  manufacturer: Manufacturer;


  // @ForeignKey(() => Rfq)
  @Column({
    type: DataType.STRING,
    field: 'rfq_id',
  })
  rfqId: number;

  // @BelongsTo(() => Rfq, 'rfqId')
  // rfq: Rfq;

      
  @Column({
    type: DataType.STRING,
    field: 'source'
  })
  source: 'app' | 'internal';
    
  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'pending'
  })
  status: 'pending' | 'approved' | 'reject' ;

  @Column({
    type: DataType.STRING,
    field: 'payment_terms'
  })
  paymentTerms: string;

  @Column({
    type: DataType.TEXT,
    field: 'notes'
  })
  notes: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;

    
  @Column({
    type: DataType.STRING,
    field: 'country_code'
  })
  countryCode: string;

  @Column({
    type: DataType.JSONB,
    field: 'items'
  })
  items: Items[];

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
