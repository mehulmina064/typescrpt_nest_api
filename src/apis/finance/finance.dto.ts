import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentTerms } from 'src/common/types/common.type';

export class FinanceDto {
    

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly standardPaymentTermsAdvance: number;    

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly standardPaymentTermsDispatch: number;    

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly standardPaymentTermsRest: PaymentTerms[];    

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly bankName: string;    

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly bankAccountNo: string;    

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly bankBranch: string;    

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly ifscCode: string;


  // @IsOptional()
  // @IsString()
  // @ApiProperty()
  // readonly annualTurnover: string;    

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly accountType: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly cancelledChequeOrBankAccProof: string;    

  @IsOptional()
  @ApiProperty()
  readonly annualRateContract: any;
    
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly isActive: boolean;
  
  
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;
  
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly manufacturerId: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}