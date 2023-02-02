import { ProductManufaturerLogistics } from './product-manufaturer-logistics.model';

export const PRODUCTMANUFATURERLOGISTICS_REPOSITORY = 'PRODUCTMANUFATURERLOGISTICS_REPOSITORY';

export const ProductManufaturerLogisticsRepository = {
  provide: PRODUCTMANUFATURERLOGISTICS_REPOSITORY,
  useValue: ProductManufaturerLogistics,
};
