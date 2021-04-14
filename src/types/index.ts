export interface Brewery {
  [id: string]: string;
  name: string;
  brewery_type: string;
  street: string;
  address_2: string;
  address_3: string;
  city: string;
  county_province: string;
  state: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  created_at: string;
  updated_at: string;
}

export interface HeaderRow {
  [name: string]: boolean;
  brewery_type: boolean;
  street: boolean;
  city: boolean;
}
