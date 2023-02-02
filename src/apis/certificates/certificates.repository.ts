import { Certificates } from './certificates.model';

export const CERTIFICATES_REPOSITORY = 'CERTIFICATES_REPOSITORY';

export const CertificatesRepository = {
  provide: CERTIFICATES_REPOSITORY,
  useValue: Certificates,
};
