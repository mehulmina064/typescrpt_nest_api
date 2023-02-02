/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  CanExportResponseData,
  CanExportResponseKey,
  CanExportResponseOption,
} from '@can/common';
import { CanTextParserService } from '@can/common/helpers';
import { ExecutionContext, Injectable } from '@nestjs/common';
import flatten = require('flat');
import { isArray, isObject } from 'lodash';
import moment = require('moment-timezone');
import fs = require('fs');
import Excel = require('exceljs');
import { Response } from 'express';
import { CanExportResponseType } from '@can/common/types';

@Injectable()
export class CanExcelExportService {
  constructor(private textParserService: CanTextParserService) {}

  /**
   *
   * Export Excel File
   *
   * @param params : ExcelExportParams
   */
  async exportExcel(params: CanExportResponseOption) {
    if (params.exportAll && params.keys && params.dataKey) {
      throw new Error(
        'exportAll & keys && dataKey can not be used simultaneously',
      );
    }
    if (params.exportAll && params.keys) {
      throw new Error('exportAll & keys can not be used simultaneously');
    }
    if (params.exportAll && params.dataKey) {
      throw new Error('exportAll & dataKey can not be used simultaneously');
    }
    if (params.keys && params.dataKey) {
      throw new Error('keys & dataKey can not be used simultaneously');
    }
    if (!params.exportAll && !params.keys && !params.dataKey) {
      throw new Error('exportAll or keys or dataKey is required');
    }
    // Export All Data Into Excel
    if (params.exportAll) {
      return this.exportAll(params);
    }
    // Export Selected Data Key From Object Which Contain Array
    if (params.dataKey) {
      return this.exportSelectedDataKey(params);
    }
    // Export Selected Values from Data
    if (params.keys) {
      return this.exportSelectedKeys(params);
    }
  }

  async handleExcelResponse(
    context: ExecutionContext,
    params: CanExportResponseOption,
    data: any[],
  ) {
    let mappedResult = isArray(data)
      ? data
      : params.dataKey
      ? isArray(data[params.dataKey])
        ? data[params.dataKey]
        : []
      : [data];
    if (params.dataKey && params.additionalKeysForDataKey) {
      const mappedObject: any = {};
      params.additionalKeysForDataKey.forEach(key => {
        mappedObject[key] = data[key];
      });
      mappedResult = mappedResult.map((res: any) => {
        return { ...res, ...mappedObject };
      });
    }

    params.data = params.data ? params.data : mappedResult;

    if (mappedResult && mappedResult.length) {
      // Create Excel Buffer
      const arrayBuffer = await this.exportExcel(params);
      // Send Buffer as Response to client
      const response = context.switchToHttp().getResponse<Response>();
      response.setHeader(
        'Content-disposition',
        'attachment; filename=' +
          `${new Date().toLocaleDateString()}_result.xlsx`,
      );
      response.contentType(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      response.send(arrayBuffer);
    }
  }

  /**
   * Export All Data into Excel
   *
   * @param params : ExcelExportParams
   */
  private async exportAll(params: CanExportResponseOption) {
    // Create Excel & Send Arraybuffer
    return this.convertToExcel(params);
  }
  /**
   *  Export Selected Data Key From Object Which Contain Array
   *
   * @param params : ExcelExportParams
   */
  private async exportSelectedDataKey(params: CanExportResponseOption) {
    // Create Excel & Send Arraybuffer
    return this.convertToExcel(params);
  }
  /**
   * Export Selected Fields from Data Set
   *
   * @param params : ExcelExportParams
   */
  private async exportSelectedKeys(params: CanExportResponseOption) {
    // Extract keys from data set
    const newDataSet: any = [];
    params.data = params.data ? params.data : [];
    // Extract Keys Names From Keys Object Array
    const keys = params.keys ? params.keys.map(key => key.name) : [];
    params.data.forEach((obj: any) => {
      // Extract selected keys from data set
      const flatObject: any = flatten(obj);
      const dataObj: any = {};
      keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
          dataObj[key] = obj[key];
          const keyValue: any = obj[key];
          if (isObject(keyValue)) {
            Object.keys(keyValue).forEach((objKey: any) => {
              const objKeyValue: any = (keyValue as any)[objKey];
              if (
                isArray(objKeyValue) &&
                objKeyValue &&
                typeof objKeyValue[0] === 'string'
              ) {
                (keyValue as any)[objKey] = objKeyValue.join(' | ');
              }
            });
            dataObj[key] = keyValue;
          }
          if (
            isArray(keyValue) &&
            keyValue &&
            typeof keyValue[0] === 'string'
          ) {
            dataObj[key] = keyValue.join(' | ');
          }
        } else if (flatObject.hasOwnProperty(key)) {
          dataObj[key] = flatObject[key];
        }
      });
      // add data into new data set
      newDataSet.push(dataObj);
    });
    // Assign new data set to params

    params.data = newDataSet;
    // Create Excel & Send Array buffer
    return this.convertToExcel(params);
  }
  /**
   * Convert Raw Data into Excel format
   *
   * @param params : ExcelExportParams
   */
  private convertToExcel(params: CanExportResponseOption) {
    return new Promise<Buffer>(resolve => {
      params.data = params.data ? params.data : [];
      // Parse Nested object into Flat Object
      // let parsedData: any = params.data.map(obj => this.flatDataObject(obj));
      let parsedData: any = params.data;
      // Parse Date String to Date & Amount to upto 2 decimal points
      parsedData = parsedData.map((obj: any) =>
        this.mapDateAndAmountFormatInsideObject(
          obj,
          params.dateFormat,
          params.keys,
        ),
      );

      // Transform Key Name
      parsedData = parsedData.map((obj: any) =>
        this.transformDataKey(
          JSON.parse(JSON.stringify(obj)),
          params.keys ? params.keys : [],
        ),
      );

      // Parse Header Key Formatting
      if (params.headerDisplayType) {
        parsedData = parsedData.map((obj: any) =>
          this.mapHeaderKeyFormatingInsideObject(obj, params.headerDisplayType),
        );
      }
      // Creating Excel Sheet
      const workbook = new Excel.Workbook();
      const worksheet: Excel.Worksheet = workbook.addWorksheet('Sheet 1');
      // Creating Sheet Column
      const mergedObj = parsedData.reduce(function(acc: any, value: any) {
        return Object.assign(acc, value);
      }, parsedData[0]);
      const objKeys = Object.keys(mergedObj);
      const columns: any = [];
      objKeys.forEach(key => {
        const defaultWidth = 10;
        const keyWidth = key.length + defaultWidth;
        const valueWidth = mergedObj[key]
          ? mergedObj[key].toString().length + defaultWidth
          : defaultWidth;
        columns.push({
          header: key,
          key: key,
          width: keyWidth > valueWidth ? keyWidth : valueWidth,
        });
      });
      worksheet.columns = columns;

      // Adding Data into sheet
      parsedData.forEach((obj: any) => worksheet.addRow(obj));
      // Excel file name
      const fileName = `${Date.now()}_result.xlsx`;
      // Writing excel file locally
      workbook.xlsx.writeFile(fileName).then(
        () => {
          // Converting file data into buffer
          fs.readFile(fileName, (readErr, data) => {
            if (readErr) {
              throw readErr;
            }
            // Remove local file after successful conversion
            fs.unlink(fileName, error => {
              if (error) {
                throw error;
              }
            });
            // Send Array Buffer
            resolve(data);
          });
        },
        err => {
          throw err;
        },
      );
    });
  }
  /**
   * Format Date & Amount
   *
   * For Date All Moment Format Acceptable
   *
   * @param obj : object
   * @param dateFormat : string
   */
  private mapDateAndAmountFormatInsideObject(
    obj: CanExportResponseData,
    dateFormat = 'DD/MM/YYYY',
    keys: CanExportResponseKey[] = [],
  ): any {
    const clonedObject = JSON.parse(JSON.stringify(obj));
    const objectKeys = Object.keys(clonedObject);
    objectKeys.forEach(key => {
      if (
        typeof clonedObject[key] === 'string' ||
        typeof clonedObject[key] === 'number'
      ) {
        // Find Key Config
        const keyData = keys.find(k => k.name.includes(key));
        // Map amount format inside object
        const amountRegex = new RegExp(/^\d+\.\d{1,100}$/gm);
        if (amountRegex.test(clonedObject[key])) {
          clonedObject[key] = parseFloat(<string>clonedObject[key])
            .toFixed(2)
            .toString();
        } else if (typeof clonedObject[key] === 'string') {
          // Map date format inside object
          let dateString: string = clonedObject[key];
          const splittedString = dateString.split(' ');
          if (splittedString.length > 1) {
            dateString = splittedString[0];
          } else {
            dateString = dateString.split('T')[0];
          }
          if (moment(dateString, 'YYYY-MM-DD', true).isValid()) {
            if (keys.length) {
              if (keyData && keyData.dateFormat) {
                clonedObject[key] = moment(clonedObject[key])
                  .tz('Asia/Kolkata')
                  .format(keyData.dateFormat);
              } else {
                clonedObject[key] = moment(clonedObject[key])
                  .tz('Asia/Kolkata')
                  .format(dateFormat);
              }
            } else {
              clonedObject[key] = moment(clonedObject[key])
                .tz('Asia/Kolkata')
                .format(dateFormat);
            }
          }
        } else {
          if (keyData?.isNumber && typeof clonedObject[key] === 'number') {
            clonedObject[key] = parseFloat(clonedObject[key]);
          } else {
            clonedObject[key] = clonedObject[key].toString();
          }
        }
      }
    });
    return { ...clonedObject };
  }
  /**
   *
   * Format Sheet Column Header
   *
   * @param obj : object
   * @param headerDisplayType : string
   */
  private mapHeaderKeyFormatingInsideObject(
    obj: CanExportResponseData,
    headerDisplayType: any,
  ) {
    const clonedObject = JSON.parse(JSON.stringify(obj));
    const objectKeys = Object.keys(clonedObject);
    objectKeys.forEach(key => {
      const formattedKey =
        headerDisplayType === 'uppercase'
          ? key.toUpperCase()
          : this.textParserService.convertToProperCase(key);
      clonedObject[formattedKey] = clonedObject[key];
      if (formattedKey !== key) {
        delete clonedObject[key];
      }
    });
    return { ...clonedObject };
  }
  private flatDataObject(obj: CanExportResponseData) {
    const flatObject: any = flatten(obj);
    const flatObjectKeys = Object.keys(flatObject);
    const clonedObject: any = {};
    flatObjectKeys.forEach(key => {
      // Map Nested Object keys to flat key
      const splittedKey = key.split('.');
      if (splittedKey && splittedKey.length > 1) {
        const newKey = splittedKey[splittedKey.length - 1];
        clonedObject[newKey] = flatObject[key];
      } else {
        clonedObject[key] = flatObject[key];
      }
    });
    return clonedObject;
  }

  private transformDataKey(dataObj: any, keys: CanExportResponseKey[]) {
    const clonedObject = { ...dataObj };
    keys.forEach(key => {
      // const keyName = key.name.split('.')[key.name.split('.').length - 1];
      if (clonedObject.hasOwnProperty(key.name) && key.transformedName) {
        clonedObject[key.transformedName] = clonedObject[key.name];
        delete clonedObject[key.name];
      }
    });
    return clonedObject;
  }
}
