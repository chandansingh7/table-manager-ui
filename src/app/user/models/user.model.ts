import {UserRole} from './role.enum';

export interface User {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}


