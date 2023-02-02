
export type PaymentTerms = {
    percentage : string,
    days: string
  }

  export interface  ProdoApiRes {
    status?: number,
    type?: string,
    message?: string,
    request_id?: string
}