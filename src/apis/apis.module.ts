import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AddressModule } from 'src/apis/address/address.module';
import { ManufacturerModule } from 'src/apis/manufacturer/manufacturer.module';
import { BalanceModule } from 'src/apis/balance/balance.module';
import { ProductsModule } from 'src/apis/products/products.module';
import { ProductManufacturerMapModule } from 'src/apis/product-manufacturer-map/product-manufacturer-map.module';
import { UserManufactureMapModule } from 'src/apis/user-manufacture-map/user-manufacture-map.module';
import { GstModule } from 'src/apis/gst/gst.module';
import { HsnCodesModule } from 'src/apis/hsn-codes/hsn-codes.module';import { RfqModule } from 'src/apis/rfq/rfq.module';import { BidModule } from 'src/apis/bid/bid.module';import { TaxesModule } from 'src/apis/taxes/taxes.module';import { PurchaseOrderModule } from 'src/apis/purchase-order/purchase-order.module';import { UnitsModule } from 'src/apis/units/units.module';import { DocumentsModule } from 'src/apis/documents/documents.module';import { FinanceModule } from 'src/apis/finance/finance.module';import { CertificatesModule } from 'src/apis/certificates/certificates.module';import { ProductManufaturerLogisticsModule } from 'src/apis/product-manufaturer-logistics/product-manufaturer-logistics.module';import { OtherProductsModule } from 'src/apis/other-products/other-products.module';














@Module({
  imports: [
    FileUploadModule,
    SharedModule,
    AddressModule, ManufacturerModule, BalanceModule, ProductsModule, ProductManufacturerMapModule, UserManufactureMapModule, GstModule, HsnCodesModule, RfqModule, BidModule, TaxesModule, PurchaseOrderModule, UnitsModule, DocumentsModule, FinanceModule, CertificatesModule, ProductManufaturerLogisticsModule, OtherProductsModule],
  providers: [],
  exports: [],
})
export class ApisModule {}
