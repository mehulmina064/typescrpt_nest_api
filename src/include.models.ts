import { Model, ModelCtor } from 'sequelize-typescript';
import { Address } from './apis/address/address.model';
import { Balance } from './apis/balance/balance.model';
import { Bid } from './apis/bid/bid.model';
import { Certificates } from './apis/certificates/certificates.model';
import { Documents } from './apis/documents/documents.model';
import { Finance } from './apis/finance/finance.model';
import { Gst } from './apis/gst/gst.model';
import { HsnCodes } from './apis/hsn-codes/hsn-codes.model';
import { Manufacturer } from './apis/manufacturer/manufacturer.model';
import { OtherProducts } from './apis/other-products/other-products.model';
import { ProductManufacturerMap } from './apis/product-manufacturer-map/product-manufacturer-map.model';
import { ProductManufaturerLogistics } from './apis/product-manufaturer-logistics/product-manufaturer-logistics.model';
import { Products } from './apis/products/products.model';
import { PurchaseOrder } from './apis/purchase-order/purchase-order.model';
import { Rfq } from './apis/rfq/rfq.model';
import { Taxes } from './apis/taxes/taxes.model';
import { Units } from './apis/units/units.model';
import { UserManufactureMap } from './apis/user-manufacture-map/user-manufacture-map.model';
export const MODELS: ModelCtor<Model<any, any>>[] = [
  // Define your models here
  Address,
  Balance,
  Manufacturer,
  Products,
  ProductManufacturerMap,
  UserManufactureMap,
  Rfq,
  Bid,
  HsnCodes,
  Gst,
  Taxes,
  PurchaseOrder,
  Units,
  Finance,
  Documents,
  Certificates,
  ProductManufaturerLogistics,
  OtherProducts
];
