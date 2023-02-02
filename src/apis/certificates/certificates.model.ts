import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Manufacturer } from '../manufacturer/manufacturer.model';

@Table({ tableName: 'certificates' })
export class Certificates extends Model<Certificates> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
    
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  })
  isActive: boolean;


  @Column({
    type: DataType.JSONB,
    field: 'audit_report'
  })
  auditReport: any;


    
  @Column({
    type: DataType.BOOLEAN,
    field: 'ready_for_full_scale_audit',

  })
  readyForFullScaleAudit: boolean;



  @Column({
    type: DataType.JSONB,
    field: 'certification_attachments'
  })
  certificationAttachments: any;


  @Column({
    type: DataType.JSONB,
    field: 'prodo_certifications'
  })
  prodoCertifications: any;


  // @Column({
  //   type: DataType.STRING,
  //   field: 'cancelled_cheque_or_bank_acc_proof'
  // })
  // cancelledChequeOrBankAccProof: string;

  
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
