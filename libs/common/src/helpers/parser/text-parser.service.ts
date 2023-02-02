import { Injectable } from '@nestjs/common';

@Injectable()
export class CanTextParserService {
  constructor() {}
  /**
   *
   * Replace Dynamic Text with Value in Text or JSON
   *
   * match {{key}} -> 'Value'
   *
   * @param data: object
   * @param text: string
   */
  replaceKeyWithValueInDynamicTextOrJSON<T>(
    data: { [key: string]: any },
    text: string,
  ): T {
    // Mapped Text
    let mappedText: any = text;
    // Mapped Data
    const mappedData: any = { ...data };
    // Get Keys From Text
    const separatedKeys = this.getKeysFromDynamicText(text);
    // Map Dynamic Text with Value
    if (separatedKeys && separatedKeys.length > 0) {
      separatedKeys.forEach(sKey => {
        const mappedKey = this.mapSeparatedKey(sKey);
        const mappedValue = mappedData[mappedKey];
        mappedText = mappedText.replace(sKey, mappedValue);
      });
      try {
        // if JSON string return Object
        return JSON.parse(mappedText);
      } catch (error) {
        // if not JSON string return text
        return mappedText;
      }
    } else {
      try {
        // if JSON string return Object
        return JSON.parse(mappedText);
      } catch (error) {
        // if not JSON string return text
        return mappedText;
      }
      // return text as any;
    }
  }

  convertToProperCase(text: string): string {
    const splittedText = text.trim().split(' ');
    if (splittedText.length > 1) {
      return splittedText.map(t => t[0].toUpperCase() + t.slice(1)).join(' ');
    } else {
      return (
        splittedText[0][0].toUpperCase() +
        splittedText[0].slice(1).toLowerCase()
      );
    }
  }

  /**
   * Extract All Dynamic Keys from Text
   *
   * @param text: string
   */
  private getKeysFromDynamicText(text: string) {
    // Separator
    const separator = new RegExp(/\{\{(.*?)\}\}/gm); // match {{anyText}}
    // Return Separated keys from text
    return text.match(separator);
  }

  /**
   * Replace Extracted Key to get Actual key string
   *
   * @param key: string
   */
  private mapSeparatedKey(key: string) {
    const startBraceSeparator = new RegExp(/\{\{/); // match {{
    const endBraceSeparator = new RegExp(/\}\}/); // match }}
    return key.replace(startBraceSeparator, '').replace(endBraceSeparator, '');
  }
}
