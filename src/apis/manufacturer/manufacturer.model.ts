import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BeforeCreate } from 'sequelize-typescript';
import { ANNUAL_TURNOVER, BUSINESS_TYPE, PRIMARY_CATEGORIES_TYPE } from 'src/common/enums/common.enum';
import { User } from 'src/core/user/user.model';
import * as uniqid from 'uniqid';

@Table({ tableName: 'manufacturers' })
export class Manufacturer extends Model<Manufacturer> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  


  @Column({
    type: DataType.STRING,
    field: 'company_name'
  })
  companyName: string;

  @Column({
    type: DataType.STRING,
    field: 'manufacturing_partner_id',
  })
  manufacturingPartnerId: string;


  @Column({
    type: DataType.STRING,
    field: 'company_email'
  })
  companyEmail: string;


  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_verified',

  })
  isVerified: boolean;

    @Column({
    type: DataType.STRING,
    field: 'primary_contact_name',
  })
  primaryContactName: string;

    @Column({
    type: DataType.STRING,
    field: 'primary_contact_email',
  })
  primaryContactEmail: string;

  @Column({
    type: DataType.STRING,
    field: 'primary_contact_mobile',
  })
  primaryContactMobile: string;

  @Column({
    type: DataType.STRING,
    field: 'business_type',
    allowNull: true
  })
  businessType: BUSINESS_TYPE;

  @Column({
    type: DataType.STRING,
    field: 'website',
    allowNull: true
  })
  website: string;

  @Column({
    type: DataType.JSONB,
    field: 'primary_categories'
  })
  primaryCategories:PRIMARY_CATEGORIES_TYPE[];

  @Column({
    type: DataType.JSONB,
    field: 'product_categories'
  })
  productCategories:any;

  @Column({
    type: DataType.JSONB,
    field: 'zoho_contact'
  })
  zohoContact:any;
  // @Column({
  //   type: DataType.STRING,
  //   field: 'salutation',
  // })
  // salutation: string;
  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'first_name'
  // })
  // firstName: string;
  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'last_name'
  // })
  // lastName: string;
  

  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'vendor_display_name'
  // })
  // vendorDisplayName: string;
  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'vendor_email'
  // })
  // vendorEmail: string;
  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'work_phone'
  // })
  // workPhone: string;
  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'mobile',
  //   allowNull: true
  // })
  // mobile: string;
  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'skype_name_number',
  //   allowNull: true
  // })
  // skypeNameNumber: string;
  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'designation',
  //   allowNull: true
  // })
  // designation: string;
  
  // @Column({
  //   type: DataType.STRING,
  //   field: 'department',
  //   allowNull: true
  // })
  // department: string;
    


  // @Column({
  //   type: DataType.JSONB,
  //   field: 'custom_fields'
  // })
  // customFields:any;



  @Column({
    type: DataType.STRING,
    field: 'zoho_id'
  })
  zohoId: string;

  @Column({
    type: DataType.STRING,
    field: 'state'
  })
  state: string;


  @Column({
    type: DataType.STRING,
    field: 'annual_turnover'
  })
  annualTurnover: ANNUAL_TURNOVER;
    
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

  @BeforeCreate
  static async beforeCreateHook(manufacturer: Manufacturer ) {
    // manufacturer.manufacturingPartnerId = uniqid('PD-').toUpperCase();
  }
}
