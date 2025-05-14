import {UserRole} from './role.enum';

export interface User {
  id?:number;
  username: string;
  email: string;
  password?: string;
  role?: UserRole;
}


