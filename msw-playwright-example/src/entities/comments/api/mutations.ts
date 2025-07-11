import type { DefaultError, UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { KyInstance, Options } from 'ky'
import type { CommentDto, CommentInputDto } from '@/shared/api/dto'
import { commentsApi } from './instance'

export const COMMENTS_MUTATION_KEY = {
  POST_POSTS_POSTID_COMMENTS: ['posts', 'postId', 'comments'],
  PUT_COMMENTS_ID: ['comments', 'id'],
  DELETE_COMMENTS_ID: ['comments', 'id'],
}

const mutations = {
  postPostsByPostIdComments: () => ({
    mutationFn: (variables: TPostPostsByPostIdCommentsVariables) => {
      const { postId, body } = variables
      return commentsApi.postPostsByPostIdComments(postId, body)
    },
    mutationKey: COMMENTS_MUTATION_KEY.POST_POSTS_POSTID_COMMENTS,
  }),
  putCommentsById: () => ({
    mutationFn: (variables: TPutCommentsByIdVariables) => {
      const { id, body } = variables
      return commentsApi.putCommentsById(id, body)
    },
    mutationKey: COMMENTS_MUTATION_KEY.PUT_COMMENTS_ID,
  }),
  deleteCommentsById: () => ({
    mutationFn: (variables: TDeleteCommentsByIdVariables) => {
      const { id } = variables
      return commentsApi.deleteCommentsById(id)
    },
    mutationKey: COMMENTS_MUTATION_KEY.DELETE_COMMENTS_ID,
  }),
}

export { mutations as commentsMutations }

/**
 * @tags comments
 * @summary Add comment
 * @request POST:/posts/{postId}/comments
 */
export const usePostPostsByPostIdCommentsMutation = (
  options?: Omit<
    UseMutationOptions<
      CommentDto,
      DefaultError,
      TPostPostsByPostIdCommentsVariables
    >,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postPostsByPostIdComments(),
    ...options,
  })
}

/**
 * @tags comments
 * @summary Update comment
 * @request PUT:/comments/{id}
 */
export const usePutCommentsByIdMutation = (
  options?: Omit<
    UseMutationOptions<CommentDto, DefaultError, TPutCommentsByIdVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.putCommentsById(),
    ...options,
  })
}

/**
 * @tags comments
 * @summary Delete comment
 * @request DELETE:/comments/{id}
 */
export const useDeleteCommentsByIdMutation = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, TDeleteCommentsByIdVariables>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.deleteCommentsById(),
    ...options,
  })
}

type TPostPostsByPostIdCommentsVariables = {
  postId: string
  body: CommentInputDto
  kyInstance?: KyInstance
  options?: Options
}
type TPutCommentsByIdVariables = {
  id: string
  body: CommentInputDto
  kyInstance?: KyInstance
  options?: Options
}
type TDeleteCommentsByIdVariables = {
  id: string
  kyInstance?: KyInstance
  options?: Options
}
