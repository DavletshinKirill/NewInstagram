import { Post } from "./post";
import { RenderUser } from "./render_user";


export class Comments {
  id!: number;
  comment: string;
  user!: RenderUser;
  post!: Post;
}
