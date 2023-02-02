import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SEQUALIZE_DATABASE_PROVIDER } from 'src/core/constants/app.constant';

@Injectable()
export class QueryService {
  constructor(
    @Inject(SEQUALIZE_DATABASE_PROVIDER) private sequalize: Sequelize,
  ) {}

  async executeQuery<T>(query: string): Promise<T> {
    const response: any = await this.sequalize.query(query);
    return response.length ? response[0] : response;
  }
}
