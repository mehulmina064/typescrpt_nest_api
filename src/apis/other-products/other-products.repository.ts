import { OtherProducts } from './other-products.model';

export const OTHERPRODUCTS_REPOSITORY = 'OTHERPRODUCTS_REPOSITORY';

export const OtherProductsRepository = {
  provide: OTHERPRODUCTS_REPOSITORY,
  useValue: OtherProducts,
};
