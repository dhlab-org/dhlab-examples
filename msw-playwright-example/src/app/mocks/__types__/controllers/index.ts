import type { TLoginControllers } from "./login.type";
import type { TUsersControllers } from "./users.type";
import type { TPostsControllers } from "./posts.type";
import type { TCommentsControllers } from "./comments.type";

export type TControllers = Partial<
  TLoginControllers &
    TUsersControllers &
    TPostsControllers &
    TCommentsControllers
>;
