import { INestApplication, Injectable } from '@nestjs/common';

@Injectable()
export class CanContextService {
  private static appContext: INestApplication;

  static init(context: INestApplication) {
    this.appContext = context;
  }

  static getAppContext() {
    return this.appContext;
  }
}
