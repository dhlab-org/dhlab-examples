import type { TCommentsControllers } from './comments.type';
import type { TLoginControllers } from './login.type';
import type { TPostsControllers } from './posts.type';
import type { TUsersControllers } from './users.type';

export type TControllers = Partial<TLoginControllers & TUsersControllers & TPostsControllers & TCommentsControllers>;
