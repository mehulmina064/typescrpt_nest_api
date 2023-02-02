import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PaymentTerms } from 'src/common/types/common.type';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';

@Table({ tableName: 'finances' })
export class Finance extends Model<Finance> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @Column({
    type: DataType.DOUBLE,
    field: 'standard_payment_terms_advance'
  })
  standardPaymentTermsAdvance: number;

  @Column({
    type: DataType.DOUBLE,
    field: 'standard_payment_terms_dispatch'
  })
  standardPaymentTermsDispatch: number;

  @Column({
    type: DataType.JSONB,
    field: 'standard_payment_terms_rest'
  })
  standardPaymentTermsRest: PaymentTerms;

  @Column({
    type: DataType.STRING,
    field: 'bank_name'
  })
  bankName: string;

  @Column({
    type: DataType.STRING,
    field: 'bank_account_no'
  })
  bankAccountNo: string;


  @Column({
    type: DataType.STRING,
    field: 'bank_branch'
  })
  bankBranch: string;


  @Column({
    type: DataType.STRING,
    field: 'ifsc_code'
  })
  ifscCode: string;



  // @Column({
  //   type: DataType.STRING,
  //   field: 'annual_turnover'
  // })
  // annualTurnover: string;




  @Column({
    type: DataType.STRING,
    field: 'account_type'
  })
  accountType: string;


  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',

  })
  isActive: boolean;



  @Column({
    type: DataType.JSONB,
    field: 'annual_rate_contract'
  })
  annualRateContract: any;


  @Column({
    type: DataType.STRING,
    field: 'cancelled_cheque_or_bank_acc_proof'
  })
  cancelledChequeOrBankAccProof: string;

  
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
