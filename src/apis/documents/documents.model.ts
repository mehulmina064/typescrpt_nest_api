import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';

@Table({ tableName: 'documents' })
export class Documents extends Model<Documents> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @Column({
    type: DataType.STRING,
    field: 'attention',
  })
  attention: string;
  
  @Column({
    type: DataType.STRING,
    field: 'gstin'
  })
  gstin: string;

  @Column({
    type: DataType.STRING,
    field: 'region_code'
  })
  regionCode: string;

  @Column({
    type: DataType.STRING,
    field: 'gst_treatment'
  })
  gstTreatment: string;


  @Column({
    type: DataType.STRING,
    field: 'tax'
  })
  tax: string;


  @Column({
    type: DataType.STRING,
    field: 'state'
  })
  state: string;


  @Column({
    type: DataType.STRING,
    field: 'pan_number'
  })
  panNumber: string;

  @Column({
    type: DataType.STRING,
    field: 'pan_copy'
  })
  panCopy: string;


  @Column({
    type: DataType.STRING,
    field: 'gst_certificate'
  })
  gstCertificate: string;


  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_primary',
  })
  isPrimary: boolean;

  
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
