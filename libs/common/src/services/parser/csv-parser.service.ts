import { HttpService, Injectable } from '@nestjs/common';
import csvtojson = require('csvtojson');

@Injectable()
export class CanCsvParserService {
  constructor(private httpService: HttpService) {}

  async parseLocalCSVToJSON<T>(csvFilePath: string): Promise<T> {
    try {
      const response: any = await csvtojson().fromFile(csvFilePath);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async parseCSVToJsonFromUrl<T>(csvFileUrl: string): Promise<T> {
    try {
      const csvString = await this.httpService.get(csvFileUrl).toPromise();
      const response: any = await csvtojson().fromString(csvString.data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
