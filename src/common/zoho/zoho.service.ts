import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { String } from 'aws-sdk/clients/apigateway';
import { ApiService } from '../services/api/api.service';
import { CanRedisKeysService } from '../services/redis/redis-key.service';
import { CanRedisService } from '../services/redis/redis.service';
import { ZOHO_API } from './zoho.config';
import { AuthToken, ZohoResponse } from './zoho.type';
const FormData = require('form-data');

@Injectable()
export class ZohoService {
 
  constructor( 
    private configService: ConfigService,
    private apiService: ApiService,
    private canRedisService:CanRedisService,
    private canRedisKeysService:CanRedisKeysService
    ) {
  }

  private async generateAuthToken(): Promise<AuthToken> {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append('client_id', this.configService.get('ZOHO_CLIENT_ID'))
        formData.append('client_secret', this.configService.get('ZOHO_CLIENT_SECRET'))
        formData.append('refresh_token', this.configService.get('ZOHO_REFRESH_TOKEN'))
        formData.append('grant_type', this.configService.get('ZOHO_GRANT_TYPE'))
        const reqOption: any = {
          url: this.configService.get('ZOHO_AUTH_URL'),
          method: 'post',
          data: formData,
          headers: formData.getHeaders()
        }
        const res:any = await this.apiService.request(reqOption);
        resolve(res);
      } catch (error) {
        reject(error)
      }
    })
  }

  private async syncManufacturer(body: any, auth: AuthToken){
    return new Promise(async (resolve, reject) => {
      try {
        const reqOption: any = {
          url: `${this.configService.get('ZOHO_BOOKS_API')}/api/v3/contacts`,
          method: 'POST',
          headers: {
            Authorization: `${auth.token_type} ${auth.access_token}`
          },
          data: body
        }
        const res : ZohoResponse= await this.apiService.request(reqOption);
          resolve(res);
     
      } catch (error) {
        // if(error && error.response && error.response.status && [401,403].includes(error.response.status)){
        //   resolve(this.syncToZoho(ZOHO_SYNC.MANUFACTURER_SYNC, body));
        // }else{
        //   reject(error);
        // }
        reject(error);
        
      }
    })
  }


  private async syncAddress(body: any, auth: AuthToken, contactId:String){
    return new Promise(async (resolve, reject) => {
      console.log("BODY ::::::",body,"contactId :::::::::",contactId);
      
      try {
        const reqOption: any = {
          url: `${this.configService.get('ZOHO_BOOKS_API')}/api/v3/contacts/${contactId}/address`,
          method: 'POST',
          headers: {
            Authorization: `${auth.token_type} ${auth.access_token}`
          },
          data: body
        }
        const res : ZohoResponse= await this.apiService.request(reqOption);
        console.log("ZOHO RES :::::::",res);
        
          resolve(res);
     
      } catch (error) {
        console.log("Error In ADDRESS ZOHO :::::",error);
        
          reject(error);
      }
    })
  }

  private async getContacts(auth: AuthToken){
    return new Promise(async (resolve, reject) => {
      try {
        const reqOption: any = {
          url: `${this.configService.get('ZOHO_BOOKS_API')}/api/v3/contacts`,
          method: 'GET',
          headers: {
            Authorization: `${auth.token_type} ${auth.access_token}`
          }
        }
        const res : ZohoResponse= await this.apiService.request(reqOption);
        console.log("ZOHO RES :::::::",res);
          resolve(res);
     
      } catch (error) {
        console.log("Error In CONTACT ZOHO :::::",error);
        
          reject(error);
      }
    })
  }

  public async request(type : ZOHO_API,body? : any, params? : any){
    try {
      let auth = await this.canRedisService.get(this.canRedisKeysService.zohoAuth());
      if(auth && Object.keys(auth).length){
        let res = {};
        switch (type) {
          case ZOHO_API.MANUFACTURER_SYNC:
            res =  await this.syncManufacturer(body, auth);
            break;
          case ZOHO_API.ADDRESS_SYNC:
            res = await this.syncAddress(body,auth, params.contactId)
            break;
          case ZOHO_API.CONTACT_GET:
            res = await this.getContacts(auth)
            break;
          default:
            break;
        }
        return res;
      }else{
        auth = await this.generateAuthToken();
        await this.canRedisService.set(this.canRedisKeysService.zohoAuth(), auth);
        return this.request(type,body,params);
      }
    } catch (error) {
      console.log("SYNC ERROR ::::::",error);
      
      if(error && error.response && error.response.status && [401,403].includes(error.response.status)){
        const auth = await this.generateAuthToken();
        await this.canRedisService.set(this.canRedisKeysService.zohoAuth(), auth);
        return this.request(type,body,params);
      }else{
        throw new BadRequestException(error);
      }
    }

  }

}
