import type { DefaultError, UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { UserDto, UserInputDto } from '@/shared/api/dto';

import type { KyInstance, Options } from 'ky';
import { usersApi } from './instance';

export const USERS_MUTATION_KEY = {
  POST_USERS: ['users'],
};

const mutations = {
  postUsers: () => ({
    mutationFn: (variables: TPostUsersVariables) => {
      const { body } = variables;
      return usersApi.postUsers(body);
    },
    mutationKey: USERS_MUTATION_KEY.POST_USERS,
  }),
};

export { mutations as usersMutations };

/**
 * @tags users
 * @summary Create a new user
 * @request POST:/users
 */
export const usePostUsersMutation = (
  options?: Omit<
    UseMutationOptions<UserDto, DefaultError, TPostUsersVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postUsers(),
    ...options,
  });
};

type TPostUsersVariables = { body: UserInputDto; kyInstance?: KyInstance; options?: Options };
