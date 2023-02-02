import { Model } from 'sequelize';
import { Op } from 'sequelize';
import * as _ from 'lodash';

/**
 * Parse Model to Plain Object
 *
 * @param model : Model
 *
 * @return U
 */
export function parseModelToJson<T extends Model, U>(model: T): U {
  const obj: any = model.toJSON();
  return obj;
}

/**
 *
 * Parse Incoming Query Params to Sequalize Query Params
 *
 * @param query : any
 */
export function parseQueryToSequalizeQuery(query: any): any {
  return renameOperatorInQuery(query);
}

/**
 *
 * Rename Operator in Query Params According to Sequalize Opearator
 *
 * @param query : any
 */
function renameOperatorInQuery(query: any) {
  if (_.isObject(query)) {
    Object.keys(query).map(key => {
      if (_.isObject(query[key])) {
        query[key] = renameOperatorInQuery(query[key]);
      }
      if (_.isArray(query[key])) {
        query[key] = query[key].map(q => renameOperatorInQuery(q));
      }
      if (key === 'and') {
        query[Op.and] = query['and'];
        delete query['and'];
      }
      if (key === 'or') {
        query[Op.or] = query['or'];
        delete query['or'];
      }
      if (key === 'like') {
        query[Op.like] = query['like'];
        delete query['like'];
      }
      if (key === 'ilike') {
        query[Op.iLike] = query['ilike'];
        delete query['ilike'];
      }
      if (key === 'between') {
        query[Op.between] = query['between'];
        delete query['between'];
      }
      if (key === 'ne') {
        query[Op.ne] = query['ne'];
        delete query['ne'];
      }
    });
  }
  return query;
}
