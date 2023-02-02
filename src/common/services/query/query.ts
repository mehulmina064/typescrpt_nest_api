export class Query {
  static getActiveUserAndPermissions(userId: number | string) {
    return `     
      SELECT user_id, user_name, is_active,type,
      ARRAY_AGG (DISTINCT trim(role_name)) AS roles, 
      ARRAY_AGG (DISTINCT trim(permission_name)) AS permissions 
      FROM user_role_permissions 
      WHERE user_id = ${userId} and is_active = true
      GROUP BY user_id,user_name, is_active, type;
    `;
  }
  // static getActiveUser(mobile: string) {
  //   return `     
  //     SELECT * from users where mobile = '${mobile}'
  //   `;
  // }
  static getManufacturerProduct(manufacturerId: string, ilike: string) {
    return `     
          SELECT
            pro.id as id,
            pro.name as name,
            pro.description as description,
            pro.super_category as superCategory,
            pro.category as category,
            pro.sub_category as subCategory,
            pro.sub_sub_category as subSubCategory,
            pro.sku as sku
          from
            product_manufacturer_maps as pmm
            JOIN products as pro ON pro.id = pmm.product_id
          where
            pmm.manufacturer_id = '${manufacturerId}'
            and pro.sku ILIKE '${ilike}'
          group by
            pro.id,
            pro.name,
            pro.description,
            pro.super_category,
            pro.sub_category,
            pro.sub_sub_category,
            pro.sku
    `;
  }

  static getManufacturerInformations(manufacturerId: string | number) {
    return `     
      select
      man.primary_categories,
      man.business_type,
      man.zoho_id,
      (
        SELECT
          Jsonb_agg (address) AS "addresses"
        FROM
          (
            SELECT
              addr.state
            from
              manufacturers as man
              JOIN addresses as addr ON man.id = addr.manufacturer_id
            where
              addr.type = 'billing' and man.id = ${manufacturerId}
          ) address
      ),
      (
        SELECT
          Jsonb_agg (finance) AS "finances"
        FROM
          (
            SELECT
              fin.annual_turnover
            from
              manufacturers as man
          JOIN finances as fin ON man.id = fin.manufacturer_id
            where man.id = ${manufacturerId}
          ) finance
      )
    from
      manufacturers as man
    where
      man.id = ${manufacturerId}
    group by
      man.id,
      man.primary_categories,
      man.business_type,
      man.zoho_id
  `;
  }

  static getManufacturerZohoZyncInfo(manufacturerId: string | number) {
    return `     
    select
    man.company_name as company_name,
    man.company_name as contact_name
  from
    manufacturers as man
  where
    man.id = ${manufacturerId}
`;
  }

  static getAddresssZohoZyncInfo(addressId: string | number) {
    return `     
        SELECT
        addr.attention as attention,
        addr.city as city,
        addr.state as "state",
        addr.address_1 as address,
        addr.address_2 as street2,
        addr.pin_code as zip,
        addr.country as country,
        addr.phone as phone,
        man.zoho_id as "contactId"
      from
        manufacturers as man
        JOIN
      addresses as addr
      ON man.id = addr.manufacturer_id
      where
        addr.id = ${addressId}
`;
  }
}
