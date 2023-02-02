import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ExceptionService {

    constructor() {
    }

    public handleError(message:string,status:number){
        switch (status) {
          case 400:
            throw new BadRequestException(message);
          case 401:
            throw new UnauthorizedException(message);
          case 403:
            throw new ForbiddenException(message);
          case 404:
            throw new NotFoundException(message);
          case 408:
            throw new RequestTimeoutException(message);
          default:
            throw new InternalServerErrorException(message);
            
        }
      }


}
