import { ProductManufacturerMap } from './product-manufacturer-map.model';

export const PRODUCTMANUFACTURERMAP_REPOSITORY = 'PRODUCTMANUFACTURERMAP_REPOSITORY';

export const ProductManufacturerMapRepository = {
  provide: PRODUCTMANUFACTURERMAP_REPOSITORY,
  useValue: ProductManufacturerMap,
};
