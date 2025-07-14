import type { DefaultError, UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { KyInstance, Options } from 'ky';
import type { LoginInputDto, UserDto } from '@/shared/api/dto';
import { authApi } from './instance';

export const AUTH_MUTATION_KEY = {
  POST_LOGIN: ['login'],
};

const mutations = {
  postLogin: () => ({
    mutationFn: (variables: TPostLoginVariables) => {
      const { body } = variables;
      return authApi.postLogin(body);
    },
    mutationKey: AUTH_MUTATION_KEY.POST_LOGIN,
  }),
};

export { mutations as authMutations };

/**
 * @tags auth
 * @summary User login
 * @request POST:/login
 */
export const usePostLoginMutation = (
  options?: Omit<UseMutationOptions<UserDto, DefaultError, TPostLoginVariables>, 'mutationFn' | 'mutationKey'>
) => {
  return useMutation({
    ...mutations.postLogin(),
    ...options,
  });
};

type TPostLoginVariables = { body: LoginInputDto; kyInstance?: KyInstance; options?: Options };
