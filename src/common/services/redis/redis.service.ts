import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const redis = require("redis");
const util = require('util');

@Injectable()
export class CanRedisService {
  private redisConfig;
  private gbRedisConfig;
  private client;
  private gbClient;

  constructor(
    private configService: ConfigService,
  ) {


    this.redisConfig = {
      host: this.configService.get('REDIS_HOST_URL'),
      port: this.configService.get('REDIS_PORT'),
      no_ready_check: this.configService.get('REDIS_NO_READY_CHECK'),
      auth_pass: this.configService.get('REDIS_PASSWORD')
    }
 
    this.client = redis.createClient(this.redisConfig);

  }

  async get(key: string) {
    this.client.get = util.promisify(this.client.get);
    return JSON.parse(await this.client.get(key))
  }

  async getArray(keyArr) {
    this.client.get = util.promisify(this.client.get);
    let resObj = {};
    for (let index = 0; index < keyArr.length; index++) {
      resObj[keyArr[index]] = JSON.parse(await this.client.get(keyArr[index]))
    }
    return resObj;
  }

  set(key: string, value: any) {
    this.client.set(key, JSON.stringify(value));
}

  gbSet(key: string, value: any) {
    try {
      if(this.gbClient){
        this.gbClient.set(key, JSON.stringify(value));
      }else{
        console.log("REDIS IS NOT CONNECTED");
      }
    } catch (error) {
      console.log("GB REDIS ERROR ",error);
      
    }
   
  }

  async delCache(key: string) {
    return await this.client.del(key);
  }

}
