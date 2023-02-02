import { FindOptions, Model } from 'sequelize';
import { parseModelToJson } from './parser';

/**
 * Exclude Property from Response
 *
 * @param filter : FindOptions
 * @param properties : string
 *
 * @return FindOptions
 */
export function excludePropertyFromFind(
  filter: FindOptions,
  properties: string[],
): FindOptions {
  if (filter) {
    if (
      filter.attributes &&
      'exclude' in filter.attributes &&
      filter.attributes.exclude
    ) {
      filter.attributes = {
        exclude: [...filter.attributes.exclude, ...properties],
      };
    } else {
      filter.attributes = { exclude: [...properties] };
    }
  } else {
    filter = {
      attributes: { exclude: [...properties] },
    };
  }
  return filter;
}

/**
 * Exclude Property From Create or Update response
 *
 * @param model : Model
 * @param properties : string
 *
 * @return U
 */
export function excludePropertyFromModel<T extends Model, U>(
  model: T,
  properties: string[],
): U {
  const parsedData: any = parseModelToJson<T, object>(model);
  properties.forEach(property => delete parsedData[property]);
  return parsedData;
}
