import {
    BadRequestException,
      CallHandler,
      ExecutionContext,
      Injectable,
      NestInterceptor,
      NotFoundException,
    } from '@nestjs/common';
    import { Observable } from 'rxjs';
    import { map ,tap} from 'rxjs/operators';
   
    import { QueryService } from '../services/query/query.service';
    import { Query } from '../services/query/query';
    import * as _ from 'lodash';
  import { reject } from 'lodash';
import { CanContextService } from '@can/common';
import { ManufacturerService } from 'src/apis/manufacturer/manufacturer.service';
  
    
  
    @Injectable()
    export class ManufacturerSyncInterceptor implements NestInterceptor {
      intercept(context: ExecutionContext, next: CallHandler): Observable<any> {  
         return next.handle().pipe(
            tap( data => {
                const request = context.switchToHttp().getRequest<any>();
                const manufacturerService  = CanContextService.getAppContext().get(ManufacturerService);
                if(request.method == 'POST'){
                  if(data && data.manufacturerId){
                    // manufacturerService.createPartnerId(data.manufacturerId);
                    // manufacturerService.syncToZoho(data.id);
                  }
                }
            }),
          );
       }
  
   
  
  }
      