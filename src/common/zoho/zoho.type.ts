
export interface AuthToken{
    access_token : string,
    api_domain : string,
    token_type : string,
    expires_in : number
  }


export interface ZohoResponse {
    code?: number;
    message?: string;
  }

export interface CustomFields{
  field_id: string,
  customfield_id: string,
  show_in_store: boolean,
  show_in_portal: boolean,
  is_active: boolean,
  index: 1,
  label: string,
  show_on_pdf: boolean,
  edit_on_portal: boolean,
  edit_on_store: boolean,
  api_name: string,
  show_in_all_pdf: boolean,
  value_formatted: string,
  search_entity: string,
  data_type: string,
  placeholder: string,
  value: string,
  is_dependent_field: boolean
}

export interface CustomFieldHash{
  cf_catalog_id: string,
  cf_catalog_id_unformatted: string
}
export interface Contact{
  contact_id: string,
  contact_name: string,
  customer_name: string,
  vendor_name: string,
  company_name: string,
  website: string,
  language_code: string,
  language_code_formatted: string,
  contact_type: string,
  contact_type_formatted:string,
    status: string,
    customer_sub_type: string,
    source: string,
    is_linked_with_zohocrm: true,
    payment_terms: number,
    payment_terms_label: string,
    currency_id: string,
    twitter: string,
    facebook: string,
    currency_code: "INR",
    outstanding_receivable_amount: number,
    outstanding_receivable_amount_bcy: number,
    outstanding_payable_amount: number,
    outstanding_payable_amount_bcy: number,
    unused_credits_receivable_amount: number,
    unused_credits_receivable_amount_bcy: number,
    unused_credits_payable_amount: number,
    unused_credits_payable_amount_bcy: number,
    customer_credit_limit: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    mobile: string,
    portalstatus: string,
    created_time: string,
    created_time_formatted: string,
    last_modified_time: string,
    last_modified_time_formatted: string,
    custom_fields: CustomFields[],
    cf_catalog_id: string,
    cf_catalog_id_unformatted: string,
    custom_field_hash: CustomFieldHash,
    ach_supported: false,
    gst_treatment: string,
    tax_treatment: string,
    gst_no: string,
    place_of_contact: string,
    place_of_contact_formatted: string,
    has_attachment: false
  
}