import { faker } from '@faker-js/faker/locale/ko';
import type { CommentDto } from '@/shared/api/dto';
import type { TPostsControllers } from '../__types__/controllers/posts.type';

const COMMENT: CommentDto[] = [
  {
    id: faker.string.uuid(),
    content: faker.lorem.paragraph(),
    userId: faker.string.uuid(),
    postId: faker.string.uuid(),
    author: {
      id: faker.string.uuid(),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      createdAt: faker.date.past().toISOString(),
    },
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  },
];

export const postsController: Partial<TPostsControllers> = {
  getCreateComment201Response: async (info) => {
    const requestBody = await info.request.json();

    const newComment: CommentDto = {
      id: faker.string.uuid(),
      content: requestBody.content,
      userId: faker.string.uuid(),
      postId: info.params.postId,
      author: {
        id: faker.string.uuid(),
        username: faker.person.fullName(),
        email: faker.internet.email(),
        createdAt: faker.date.past().toISOString(),
      },
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
    };

    COMMENT.unshift(newComment);

    return newComment;
  },
  getGetPostComments200Response: async () => {
    return COMMENT;
  },
};
