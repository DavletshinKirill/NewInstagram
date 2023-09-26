import { ROLE } from '../model/auth/role';
import { Post } from './post';

export class RenderUser {
  id!: number;
  username!: string;
  mainPhoto!: string;
  posts!: Post[];
}
