import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CanRedisKeysService {


  private env: string = this.configService.get('REDIS_ENV');

  constructor(
    private configService: ConfigService,
  ) {

  }

  zohoAuth() {
    return `pd:${this.env}:zoho-auth:token`;
  }

  
}
