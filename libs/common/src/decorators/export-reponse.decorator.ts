import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CAN_EXPORT_RESPONSE_TYPE } from '../constants';
import { CanExportResponseInterceptor } from '../interceptors/export.interceptor';
import { CanExportResponseType } from '../types/export-response.type';

export function CanExportResponse(type: CanExportResponseType = 'excel'): any {
  return applyDecorators(
    SetMetadata(CAN_EXPORT_RESPONSE_TYPE, type),
    UseInterceptors(CanExportResponseInterceptor),
  );
}
