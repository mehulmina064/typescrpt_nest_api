import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as flatten from 'flat';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    if (
      request.method === 'GET' ||
      request.method === 'POST' ||
      request.method === 'PUT' ||
      request.method === 'PATCH' ||
      request.method === 'DELETE'
    ) {
      return next.handle().pipe(
        map(data => {
          const response: Response = context.switchToHttp().getResponse(); 
          const res =  data.response ? data.response : data;
          const mappedResponse = {
            statusCode: response.statusCode,
            data :  data.response ? data.response : data,
            message: data['message'] ?? 'Success',
            fieldErrors: [],
            error: false,
          };
          
          if(mappedResponse.statusCode == 403){
            return response.status(403).json(mappedResponse)
          }
          return mappedResponse;
        }),
      );
    } else {
      return next.handle();
    }
  }

  private getQueryFilter(request){
    try {    
     return JSON.parse(request.query['filter'] as string);
    } catch (error) {
      return request.query['filter']
    }
  }

}
