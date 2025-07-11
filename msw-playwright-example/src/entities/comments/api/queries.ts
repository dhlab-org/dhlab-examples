import type { DefaultError, UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import type { CommentDto } from '@/shared/api/dto';

import { commentsApi } from './instance';

export const COMMENTS_QUERY_KEY = {
  GET_POSTS_POSTID_COMMENTS: (postId: string) => ['posts', postId, 'comments'],
};

const queries = {
  getPostsByPostIdComments: (postId: string) => ({
    queryKey: COMMENTS_QUERY_KEY.GET_POSTS_POSTID_COMMENTS(postId),
    queryFn: () => commentsApi.getPostsByPostIdComments(postId),
  }),
};

export { queries as commentsQueries };

// ---------------------- Query ------------------------------
/**
 * @tags comments
 * @summary Get post comments
 * @request GET:/posts/{postId}/comments*
 */
export const useGetPostsByPostIdCommentsQuery = <TData = CommentDto[],>(
  postId: string,
  options?: Omit<UseQueryOptions<CommentDto[], DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    ...queries.getPostsByPostIdComments(postId),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags comments
 * @summary Get post comments
 * @request GET:/posts/{postId}/comments*
 */
export const useGetPostsByPostIdCommentsSuspenseQuery = <TData = CommentDto[],>(
  postId: string,
  options?: Omit<UseSuspenseQueryOptions<CommentDto[], DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useSuspenseQuery({
    ...queries.getPostsByPostIdComments(postId),
    ...options,
  });
};
