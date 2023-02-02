import { Products } from './products.model';

export const PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';

export const ProductsRepository = {
  provide: PRODUCTS_REPOSITORY,
  useValue: Products,
};
