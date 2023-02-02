import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import * as _ from 'lodash';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    try {
      console.log("exception ::::::",exception);
      
      const exceptionResponse: any = exception.getResponse();
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        data: null,
        message:  _.isArray(exceptionResponse['message'])
          ? exceptionResponse['message'][0]
          : exceptionResponse['message'] ? exceptionResponse['message'] : exceptionResponse[Object.keys(exceptionResponse)[0]] ,
        fieldErrors: _.isArray(exceptionResponse['message'])
          ? exceptionResponse['message']
          : [],
        error: true,
      });
    } catch (error) {
      console.log("ERROR :::::",error);
      
      response.status(500).json({
        statusCode: 500,
        data: null,
        message: 'Internal Server Error',
        fieldErrors: ['Internal Server Error'],
        error: true,
      });
    }

    // Validate Customer Role
    //  if (
    //   validateRoutes.includes(
    //     request['route'].path.split('/:id')[0].toLowerCase(),
    //   )  &&
    //   request['user']['roles'].find(
    //     (role: string) => role.toLowerCase() === 'customer',
    //   )
    // ) {
    //    const userId = request['user']['user_id'];
    //     const query: any = this.getQueryFilter(request)
    //     const flatQuery = flatten(query);
    //     const keys = Object.keys(flatQuery);
    //     for (let i = 0; i < keys.length; i++) {
    //       if (keys[i].toLowerCase().includes('userid')) {
    //         const queryUserId = flatQuery[keys[i]];
    //         if (queryUserId != userId) {
    //           response.status(403).json({
    //             statusCode: 403,
    //             data: null,
    //             message: 'Forbidden resource',
    //             fieldErrors: [],
    //             error: true,
    //           });
    //         }
    //     }
    //   }
    // }
  }
  private getQueryFilter(request) {
    try {
      return JSON.parse(request.query['filter'] as string);
    } catch (error) {
      return request.query['filter'];
    }
  }
}
