import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ANNUAL_TURNOVER, BUSINESS_TYPE } from 'src/common/enums/common.enum';

export class ManufacturerDto {

@IsOptional()
@IsString()
@ApiProperty()
readonly primaryContactName: string;

@IsOptional()
@IsString()
@ApiProperty()
readonly primaryContactEmail: string;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly primaryContactMobile: number;


@IsOptional()
@IsString()
@ApiProperty()
readonly companyName: string;


@IsOptional()
@IsString()
@ApiProperty()
readonly manufacturingPartnerId: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly companyEmail: string;


@IsOptional()
@IsEnum(BUSINESS_TYPE)
@ApiProperty()
readonly businessType: BUSINESS_TYPE;



@IsOptional()
@IsString()
@ApiProperty()
readonly website: string;

@IsOptional()
@IsArray()
@ApiProperty()
readonly primaryCategories: string[];

@IsOptional()
@IsArray()
@ApiProperty()
readonly productCategories: string[];

@ApiProperty()
@IsBoolean()
@IsOptional()
readonly isVerified: boolean;


@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;


// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly salutation: string;
    

// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly firstName: string;

// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly lastName: string;

// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly vendorDisplayName: string;
    

// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly vendorEmail: string;

// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly workPhone: string;


// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly mobile: string;

// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly skypeNameNumber: string;


// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly designation: string;

// @IsOptional()
// @IsString()
// @ApiProperty()
// readonly department: string;



@IsOptional()
@IsString()
@ApiProperty()
readonly zohoId: string;

@ApiProperty()
readonly state: string;


@ApiProperty()
readonly zohoContact:any;

@IsOptional()
@IsString()
@ApiProperty()
readonly annualTurnover: ANNUAL_TURNOVER;    
// @IsOptional()
// @ApiProperty()
// readonly customFields: any;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}

export class UnregisterManufacturerDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly primaryContactName: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly primaryContactEmail: string;
  
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly primaryContactMobile: number;
  
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly companyName: string;
  
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly manufacturingPartnerId: string;
  
  
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly companyEmail: string;
  
  
  @IsOptional()
  @IsEnum(BUSINESS_TYPE)
  @ApiProperty()
  readonly businessType: BUSINESS_TYPE;
  
  
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly website: string;
  
  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly primaryCategories: string[];
  
  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly productCategories: string[];
  
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly isVerified: boolean;
  
  
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly isActive: boolean;
  
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly zohoId: string;
  
  @ApiProperty()
  readonly state: string;
  
  
  @ApiProperty()
  readonly zohoContact:any;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly annualTurnover: ANNUAL_TURNOVER;    
  // @IsOptional()
  // @ApiProperty()
  // readonly customFields: any;
  
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;
  
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
  }


  export class RegisterManufacturerDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly mobile: string;
    
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly companyName: string;
    
    
    
    @IsOptional()
    @IsEnum(BUSINESS_TYPE)
    @ApiProperty()
    readonly businessType: BUSINESS_TYPE;
    
    
    
    @IsOptional()
    @IsArray()
    @ApiProperty()
    readonly primaryCategories: string[];
    
    // @IsOptional()
    // @IsArray()
    // @ApiProperty()
    // readonly productCategories: string[];
    
    // @ApiProperty()
    // @IsBoolean()
    // @IsOptional()
    // readonly isVerified: boolean;
    
    
    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // readonly isActive: boolean;
    
    // @IsOptional()
    // @IsString()
    // @ApiProperty()
    // readonly zohoId: string;
    
    @ApiProperty()
    @IsNotEmpty()
    readonly state: string;
   
    @ApiProperty()
    @IsNotEmpty()
    readonly city:string;

    @ApiProperty()
    readonly country: string;

    @ApiProperty()
    readonly pinCode: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly gstin:string;
    
    // @ApiProperty()
    // readonly zohoContact:any;
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly annualTurnover: ANNUAL_TURNOVER;    
    // @IsOptional()
    // @ApiProperty()
    // readonly customFields: any;
    

    @ApiProperty()
    readonly latitude: number;
  
    @ApiProperty()
    readonly longitude: number;

    
    @IsOptional()
    @IsNumber()
    @ApiProperty()
    readonly createdById: number;
    
    @IsOptional()
    @IsNumber()
    @ApiProperty()
    readonly updatedById: number;
    }

