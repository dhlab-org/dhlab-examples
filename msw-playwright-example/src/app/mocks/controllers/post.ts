import { faker } from '@faker-js/faker/locale/ko';
import type { CommentDto, PostDto } from '@/shared/api/dto';
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

  getGetPosts200Response: () => {
    return {
      items: [...new Array(10).keys()].map((_) => ({
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        userId: faker.string.uuid(),
        author: {
          id: faker.string.uuid(),
          username: faker.person.fullName(),
          email: faker.internet.email(),
          createdAt: faker.date.past().toISOString(),
        },
        status: faker.helpers.arrayElement(['DRAFT', 'PUBLISHED']),
        tags: [...new Array(3).keys()].map((_) => faker.lorem.words()),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.past().toISOString(),
      })) as PostDto[],
      total: 10,
      page: 1,
      totalPages: 1,
    };
  },
};
