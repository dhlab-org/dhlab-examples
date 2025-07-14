import { commentsHandlers } from './comments.handlers';
import { loginHandlers } from './login.handlers';
import { postsHandlers } from './posts.handlers';
import { usersHandlers } from './users.handlers';

export const handlers = [...loginHandlers, ...usersHandlers, ...postsHandlers, ...commentsHandlers];
