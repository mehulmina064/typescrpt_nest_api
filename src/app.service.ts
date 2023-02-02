import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return `Hello From Cantech: ${new Date().toDateString()}`;
  }
}
