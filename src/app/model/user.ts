import { ROLE } from '../model/auth/role';
import { Post } from './post';
import { userAuth } from './userAuth';

export class User {
  id!: number;
  username!: string;
  password!: string;
  roles!: userAuth;
}
