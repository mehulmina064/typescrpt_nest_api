export type CanExportResponseType = 'excel' | 'csv' | 'pdf';
export type CanExportResponseOption = {
  data?: CanExportResponseData[];
  keys?: CanExportResponseKey[];
  dataKey?: string;
  additionalKeysForDataKey?: string[];
  exportAll?: boolean;
  headerDisplayType?: 'uppercase' | 'propercase';
  dateFormat?: string;
};
export interface CanExportResponseData {
  [key: string]: any;
}
export interface CanExportResponseKey {
  name: string;
  transformedName?: string;
  isNumber?: boolean;
  dateFormat?: string;
}