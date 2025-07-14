import { loginHandlers } from "./login.handlers";
import { usersHandlers } from "./users.handlers";
import { postsHandlers } from "./posts.handlers";
import { commentsHandlers } from "./comments.handlers";

export const handlers = [
  ...loginHandlers,
  ...usersHandlers,
  ...postsHandlers,
  ...commentsHandlers,
];
