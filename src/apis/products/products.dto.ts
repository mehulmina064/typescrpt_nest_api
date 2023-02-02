import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductsDto {

    // @IsNotEmpty()
    // @IsNumber()
    // id: number;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    sku: string;
  
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    superCategory: string;


    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    category: string;
    
  
    
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    subCategory: string;
    
    
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    subSubCategory: string;
    
    
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    pimcoreId: number;
    
    
    
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    countryOfOrigin: string;
    
    
    
    
    
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    unit: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    brand: string;
    
    
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    modelNo: string;
    
    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
    productImages: string[];
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    intraStateTaxRate: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    interStateTaxRate: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    hsnCode: string;
    
    
@IsOptional()
@IsBoolean()
@ApiProperty()
readonly isActive: boolean;

    
    
    // @IsOptional()
    // @IsNumber()
    // @ApiProperty()
    // upc: number;
    
    
    // @IsOptional()
    // @IsNumber()
    // @ApiProperty()
    // ean: number;
    
    
    // @IsOptional()
    // @IsString()
    // @ApiProperty()
    // mpn: string;
    

    // @IsOptional()
    // @IsNumber()
    // @ApiProperty()
    // isbn: number;
    
    
    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // madeToOrder: boolean;
    
    
    
    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // whiteLabeled: boolean;
    
    
    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // greenProduct: boolean;
    
    
    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // ecoFriendly: boolean;
    
    
    // @IsNotEmpty()
    // @IsBoolean()
    // @ApiProperty()
    // prodoExclusive: boolean;
    
    
    // @IsNotEmpty()
    // @IsBoolean()
    // @ApiProperty()
    // trackInventory: boolean;

    
    // @IsNotEmpty()
    // @IsBoolean()
    // @ApiProperty()
    // returnable: boolean;

    
    // @IsNotEmpty()
    // @IsBoolean()
    // @ApiProperty()
    // goodsOrService: boolean;
    
    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // advancedInventoryTracking: boolean;
    
    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // trackBatches: boolean;
    
    
    // @IsString()
    // @IsOptional()
    // @ApiProperty()
    // clientSkuId: string;
    

    // @IsString()
    // @IsOptional()
    // @ApiProperty()
    // salesDescription: string;
    

    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // activityStatus: boolean;


    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // purchaseInformation: boolean;


    // @IsString()
    // @IsOptional()
    // @ApiProperty()
    // fulfilment: string;
    

    // @IsNotEmpty()
    // @IsBoolean()
    // @ApiProperty()
    // salesInformation: boolean;


    // @IsString()
    // @IsOptional()
    // @ApiProperty()
    // taxPreference: string;
    
    
    
    // @IsOptional()
    // @IsString()
    // @ApiProperty()
    // intraStateTaxName: string;
    
    
    
    // @IsOptional()
    // @IsNumber()
    // @ApiProperty()
    // sellingPrice: number;
    
    
    
    
    // @IsOptional()
    // @IsNumber()
    // @ApiProperty()
    // costPrice: number;
    
    
    
    // @IsOptional()
    // @IsBoolean()
    // @ApiProperty()
    // oneTimeUse: boolean;
    
    
    // @IsOptional()
    // @IsString()
    // @ApiProperty()
    // purchaseAccount: string;
    
    
    
    // @IsOptional()
    // @IsString()
    // @ApiProperty()
    // salesAccount: string;
    
    
    
    // @IsNotEmpty()
    // @IsString()
    // @ApiProperty()
    // title: string;
    
    
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    zohoId: string;
    
    
    
  
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}