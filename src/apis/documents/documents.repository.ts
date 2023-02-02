import { Documents } from './documents.model';

export const DOCUMENTS_REPOSITORY = 'DOCUMENTS_REPOSITORY';

export const DocumentsRepository = {
  provide: DOCUMENTS_REPOSITORY,
  useValue: Documents,
};
