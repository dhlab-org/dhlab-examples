import type { DefaultError, UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { PostDto, PostInputDto } from '@/shared/api/dto';

import type { KyInstance, Options } from 'ky';
import { postsApi } from './instance';

export const POSTS_MUTATION_KEY = {
  POST_POSTS: ['posts'],
  PUT_POSTS_ID: ['posts', 'id'],
  DELETE_POSTS_ID: ['posts', 'id'],
};

const mutations = {
  postPosts: () => ({
    mutationFn: (variables: TPostPostsVariables) => {
      const { body } = variables;
      return postsApi.postPosts(body);
    },
    mutationKey: POSTS_MUTATION_KEY.POST_POSTS,
  }),
  putPostsById: () => ({
    mutationFn: (variables: TPutPostsByIdVariables) => {
      const { id, body } = variables;
      return postsApi.putPostsById(id, body);
    },
    mutationKey: POSTS_MUTATION_KEY.PUT_POSTS_ID,
  }),
  deletePostsById: () => ({
    mutationFn: (variables: TDeletePostsByIdVariables) => {
      const { id } = variables;
      return postsApi.deletePostsById(id);
    },
    mutationKey: POSTS_MUTATION_KEY.DELETE_POSTS_ID,
  }),
};

export { mutations as postsMutations };

/**
 * @tags posts
 * @summary Create a new post
 * @request POST:/posts
 */
export const usePostPostsMutation = (
  options?: Omit<
    UseMutationOptions<PostDto, DefaultError, TPostPostsVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postPosts(),
    ...options,
  });
};

/**
 * @tags posts
 * @summary Update post
 * @request PUT:/posts/{id}
 */
export const usePutPostsByIdMutation = (
  options?: Omit<
    UseMutationOptions<PostDto, DefaultError, TPutPostsByIdVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.putPostsById(),
    ...options,
  });
};

/**
 * @tags posts
 * @summary Delete post
 * @request DELETE:/posts/{id}
 */
export const useDeletePostsByIdMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TDeletePostsByIdVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.deletePostsById(),
    ...options,
  });
};

type TPostPostsVariables = { body: PostInputDto; kyInstance?: KyInstance; options?: Options };
type TPutPostsByIdVariables = {
  id: string;
  body: PostInputDto;
  kyInstance?: KyInstance;
  options?: Options;
};
type TDeletePostsByIdVariables = { id: string; kyInstance?: KyInstance; options?: Options };
