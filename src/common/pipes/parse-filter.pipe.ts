import { PipeTransform, Injectable } from '@nestjs/common';
import { parseQueryToSequalizeQuery } from '../utils/parser';

@Injectable()
export class ParseFilterPipe implements PipeTransform {
  transform(value) {
    try {
      return parseQueryToSequalizeQuery(JSON.parse(value));
    } catch (error) {
      return value;
    }
  }
}
