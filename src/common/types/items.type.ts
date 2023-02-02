
export type Items = {
    productId? : number,
    sku: string,
    quantity: number,
    rate:number,
    estimatedDeliveryDate?:string
    leadTime:number,
    productImages: string[],
    name: string
  }

  export type LineItems = {
    sku: string,
    moq: number,
    description: string,
    unit: string
  }