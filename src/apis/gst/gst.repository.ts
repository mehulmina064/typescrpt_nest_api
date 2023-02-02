import { Gst } from './gst.model';

export const GST_REPOSITORY = 'GST_REPOSITORY';

export const GstRepository = {
  provide: GST_REPOSITORY,
  useValue: Gst,
};
