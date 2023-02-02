import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ADDRESS_TYPE } from 'src/common/enums/address.enum';
import { APPROVAL_STATUS } from 'src/common/enums/status.enum';
import { User } from 'src/core/user/user.model';
import { Documents } from '../documents/documents.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';

@Table({ tableName: 'addresses' })
export class Address extends Model<Address> {
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
    field: 'country',
  })
  country: string;

  @Column({
    type: DataType.STRING,
    field: 'gstin'
  })
  gstin: string;

  @Column({
    type: DataType.STRING,
    field: 'gstin_certificate'
  })
  gstinCertificate: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'gstin_same_as_primary',
    defaultValue:false
  })
  gstinSameAsPrimary: boolean;
  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'gstin'
  // })
  // gstin: string;
  
  @Column({
    type: DataType.STRING,
    field: 'state_code'
  })
  stateCode: string;

  @Column({
    type: DataType.DOUBLE,
    field: 'pin_code'
  })
  pinCode: number;

  @Column({
    type: DataType.TEXT,
    field: 'address_1'
  })
  address1: string;
  

  @Column({
    type: DataType.TEXT,
    field: 'address_2'
  })
  address2: string;
  
  @Column({
    type: DataType.STRING,
    field: 'city'
  })
  city: string;
  
  @Column({
    type: DataType.STRING,
    field: 'state'
  })
  state: string;
  
  // @Column({
  //   type: DataType.INTEGER,
  //   field: 'zip_code'
  // })
  // zipCode: number;
  
  @Column({
    type: DataType.STRING,
    field: 'phone',
    allowNull: true
  })
  phone: string;
  
  // @Column({
  //   type: DataType.INTEGER,
  //   field: 'fax',
  //   allowNull: true
  // })
  // fax: number;

  @Column({
    type: DataType.STRING,
    field: 'google_maps_link',
    allowNull: true
  })
  googleMapsLink: string;
  
  @Column({
    type: DataType.DOUBLE,
    field: 'latitude',
    allowNull: true
  })
  latitude: number;

  @Column({
    type: DataType.DOUBLE,
    field: 'longitude',
    allowNull: true
  })
  longitude: number;

  @Column({
    type: DataType.STRING,
    field: 'type',
    allowNull: true
  })
  type: ADDRESS_TYPE;
  

  @Column({
    type: DataType.STRING,
    field: 'zoho_address_id'
  })
  zohoAddressId: string;

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


  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'draft'

  })
  status: APPROVAL_STATUS ;

  @ForeignKey(() => Documents)
  @Column({
    type: DataType.INTEGER,
    field: 'document_id',
  })
  documentId: number;

  @BelongsTo(() => Documents, 'documentId')
  document: Documents;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'created_by_id',
  })
  createdById: number;

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  
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
    field: 'updated_by_id',
  })
  updatedById: number;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;
}
