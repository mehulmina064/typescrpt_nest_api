import { PurchaseOrder } from './purchase-order.model';

export const PURCHASEORDER_REPOSITORY = 'PURCHASEORDER_REPOSITORY';

export const PurchaseOrderRepository = {
  provide: PURCHASEORDER_REPOSITORY,
  useValue: PurchaseOrder,
};
