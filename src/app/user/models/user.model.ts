import {UserRole} from './role.enum';

export interface User {
  id?:string;
  username: string;
  email: string;
  password?: string;
  role?: UserRole;
}


