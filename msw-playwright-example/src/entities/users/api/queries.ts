import type { DefaultError, UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import type { UserDto } from '@/shared/api/dto';

import { usersApi } from './instance';

export const USERS_QUERY_KEY = {
  GET_USERS: () => ['users'],
  GET_USERS_ID: (id: string) => ['users', id],
};

const queries = {
  getUsers: () => ({
    queryKey: USERS_QUERY_KEY.GET_USERS(),
    queryFn: () => usersApi.getUsers(),
  }),
  getUsersById: (id: string) => ({
    queryKey: USERS_QUERY_KEY.GET_USERS_ID(id),
    queryFn: () => usersApi.getUsersById(id),
  }),
};

export { queries as usersQueries };

// ---------------------- Query ------------------------------
/**
 * @tags users
 * @summary Get all users
 * @request GET:/users*
 */
export const useGetUsersQuery = <TData = UserDto[],>(
  options?: Omit<UseQueryOptions<UserDto[], DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    ...queries.getUsers(),
    ...options,
  });
};

/**
 * @tags users
 * @summary Get user by ID
 * @request GET:/users/{id}*
 */
export const useGetUsersByIdQuery = <TData = UserDto,>(
  id: string,
  options?: Omit<UseQueryOptions<UserDto, DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    ...queries.getUsersById(id),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags users
 * @summary Get all users
 * @request GET:/users*
 */
export const useGetUsersSuspenseQuery = <TData = UserDto[],>(
  options?: Omit<UseSuspenseQueryOptions<UserDto[], DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useSuspenseQuery({
    ...queries.getUsers(),
    ...options,
  });
};

/**
 * @tags users
 * @summary Get user by ID
 * @request GET:/users/{id}*
 */
export const useGetUsersByIdSuspenseQuery = <TData = UserDto,>(
  id: string,
  options?: Omit<UseSuspenseQueryOptions<UserDto, DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useSuspenseQuery({
    ...queries.getUsersById(id),
    ...options,
  });
};
