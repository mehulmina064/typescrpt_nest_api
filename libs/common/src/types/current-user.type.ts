export interface CanCurrentUser {
  user_id: number;
  user_name: string;
  mobile: string;
  roles: string[];
  permissions: string[];
  status: 'active' | 'inactive';
}
