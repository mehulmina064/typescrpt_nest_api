import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Items } from 'src/common/types/items.type';

export class RfqDto {

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly deliveryDate: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly startTime: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly endTime: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly status: string;


@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;


  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly rfqId: string;
      
  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  readonly items: Items[];
  
@IsOptional()
@IsNumber()
@ApiProperty()
readonly userId: number;
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}

export class ProdoRfqDto {
   
    @IsNotEmpty()
    @ApiProperty()
    @IsArray()
    readonly companyIds: string[];

    @IsNotEmpty()
    @ApiProperty()
    @IsArray()
    readonly entityIds: string[];

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly clientId: string;


    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly organizationId: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly rfqLeadId: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly assignedTo: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly dueDate: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly completionDate: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly rfqPriority: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    readonly targetPrice: number;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly customerId: string;


    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    readonly customerName: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
     lineItems: Items[];

}

