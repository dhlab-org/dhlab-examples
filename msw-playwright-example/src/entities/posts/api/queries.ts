import type { DefaultError, UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import type { GetPostsQueryParams, PostDto } from '@/shared/api/dto';

import { postsApi } from './instance';

export const POSTS_QUERY_KEY = {
  GET_POSTS: (params?: GetPostsQueryParams) => ['posts', params],
  GET_POSTS_ID: (id: string) => ['posts', id],
};

const queries = {
  getPosts: (params?: GetPostsQueryParams) => ({
    queryKey: POSTS_QUERY_KEY.GET_POSTS(params),
    queryFn: () => postsApi.getPosts(params),
  }),
  getPostsById: (id: string) => ({
    queryKey: POSTS_QUERY_KEY.GET_POSTS_ID(id),
    queryFn: () => postsApi.getPostsById(id),
  }),
};

export { queries as postsQueries };

// ---------------------- Query ------------------------------
/**
 * @tags posts
 * @summary Get all posts
 * @request GET:/posts*
 */
export const useGetPostsQuery = <
  TData = {
    items?: PostDto[];
    total?: number;
    page?: number;
    totalPages?: number;
  },
>(
  params?: GetPostsQueryParams,
  options?: Omit<
    UseQueryOptions<
      {
        items?: PostDto[];
        total?: number;
        page?: number;
        totalPages?: number;
      },
      DefaultError,
      TData
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getPosts(params),
    ...options,
  });
};

/**
 * @tags posts
 * @summary Get post by ID
 * @request GET:/posts/{id}*
 */
export const useGetPostsByIdQuery = <TData = PostDto,>(
  id: string,
  options?: Omit<UseQueryOptions<PostDto, DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    ...queries.getPostsById(id),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags posts
 * @summary Get all posts
 * @request GET:/posts*
 */
export const useGetPostsSuspenseQuery = <
  TData = {
    items?: PostDto[];
    total?: number;
    page?: number;
    totalPages?: number;
  },
>(
  params?: GetPostsQueryParams,
  options?: Omit<
    UseSuspenseQueryOptions<
      {
        items?: PostDto[];
        total?: number;
        page?: number;
        totalPages?: number;
      },
      DefaultError,
      TData
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getPosts(params),
    ...options,
  });
};

/**
 * @tags posts
 * @summary Get post by ID
 * @request GET:/posts/{id}*
 */
export const useGetPostsByIdSuspenseQuery = <TData = PostDto,>(
  id: string,
  options?: Omit<UseSuspenseQueryOptions<PostDto, DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useSuspenseQuery({
    ...queries.getPostsById(id),
    ...options,
  });
};
