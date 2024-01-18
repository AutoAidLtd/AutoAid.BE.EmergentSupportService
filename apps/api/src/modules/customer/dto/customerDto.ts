export interface customerDto {
    customer_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    address?: string;
    date_of_birth?: Date;
    account_id: number;
    account: accountDto;
}
export interface accountDto {
  account_id: number;
  created_date: Date;
  updated_date: Date;
  created_user: number;
  updated_user: number;
  is_deleted: boolean;
  username: string;
  hash_password?: string;
  email?: string;
  phone_number?: string;
  access_token?: string;
  exp_access_token?: Date;
  refresh_token?: string;
  exp_refresh_tokenn?: Date;
}
