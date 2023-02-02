import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanContextService } from '..';
import { CAN_EXPORT_RESPONSE_TYPE } from '../constants';
import {
  CanExportResponseData,
  CanExportResponseOption,
  CanExportResponseType,
} from '../types/export-response.type';
import { Request } from 'express';
import { CanExcelExportService } from '../services/export-response/excel-export.service';
import { unflatten } from 'flat'

@Injectable()
export class CanExportResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const excelExportService: CanExcelExportService = CanContextService.getAppContext().get(
      CanExcelExportService,
    );
    // Get Export Type
    const exportType = this.extractExportType(context);

    // Get Export Query
    const { exportQuery } = this.extractExportQuery(context);
    context.switchToHttp().getRequest<Request>().query[
      'filter'
    ] = this.getMappedQuery(context);

    // Return Response
    return next.handle().pipe(
      map(async data => {
        if (exportQuery && exportType === 'excel') {
          const mappedData = data.map(d => unflatten(d))
          return excelExportService.handleExcelResponse(
            context,
            exportQuery,
            mappedData,
          );
        }
        return data;
      }),
    );
  }

  private getMappedQuery(context: ExecutionContext) {
    const { exportQuery, query } = this.extractExportQuery(context);
    if (exportQuery && Object.keys(exportQuery).length) {
      if ('filter' in context.switchToHttp().getRequest<Request>().query) {
        const mappedQuery = JSON.parse(query);
        if (mappedQuery && Object.keys(mappedQuery).length) {
          if ('limit' in mappedQuery) {
            delete mappedQuery['limit'];
          }
          if ('offset' in mappedQuery) {
            delete mappedQuery['offset'];
          }
          if ('skip' in mappedQuery) {
            delete mappedQuery['skip'];
          }
        }
        return JSON.stringify(mappedQuery);
      }
    }
    return query;
  }

  private extractExportQuery(context: ExecutionContext) {
    // Get Query
    const request = context.switchToHttp().getRequest<Request>();
    let query =
      request.query && Object.keys(request.query).length > 0
        ? JSON.parse(request.query['filter'] as any)
        : null;
    /**
     * Manipulate Query
     */
    let exportQuery: CanExportResponseOption;
    if (query) {
      if (query.hasOwnProperty('where')) {
        if (query['where'].hasOwnProperty('exportExcel')) {
          exportQuery = {
            ...query['where']['exportExcel'],
          };
          delete query['where']['exportExcel'];
        } else if (query['where'].hasOwnProperty('and')) {
          const index = query['where']['and'].findIndex((q: any) =>
            q.hasOwnProperty('exportExcel'),
          );
          if (index >= 0) {
            exportQuery = query['where']['and'][index]['exportExcel'];
            query['where']['and'] = (query['where'][
              'and'
            ] as CanExportResponseData[]).slice(index + 1);
            if (query['where']['and'].length === 0) {
              delete query['where']['and'];
            }
          }
        }
      } else if (query.hasOwnProperty('exportExcel')) {
        exportQuery = query['exportExcel'];
        delete query['exportExcel'];
      }
    }

    if(exportQuery){
      if (
        !Object.keys(query).length ||
        ('where' in query && Object.keys(query['where']).length === 1)
      ) {
        query = JSON.stringify({ raw: true });
      } else {
        query['raw'] = true;
        query = JSON.stringify(query);
      }
    }else{
      query = JSON.stringify(query);

    }
  

    return {
      exportQuery,
      query,
    };
  }

  private extractExportType(context: ExecutionContext): CanExportResponseType {
    const reflector = CanContextService.getAppContext().get(Reflector);
    return reflector.get<CanExportResponseType>(
      CAN_EXPORT_RESPONSE_TYPE,
      context.getHandler(),
    );
  }
}
