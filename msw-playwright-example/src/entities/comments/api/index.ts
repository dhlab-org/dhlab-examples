import { validateSchema } from '@/shared/api/utils.gen';
import type { KyInstance, Options } from 'ky';

import type { CommentDto, CommentInputDto } from '@/shared/api/dto';
import { commentDtoSchema, commentInputDtoSchema } from '@/shared/api/schema.gen';

export class CommentsApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  /**
   * @tags comments
   * @summary Get post comments
   * @request GET:/posts/{postId}/comments
   */
  async getPostsByPostIdComments(postId: string, kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .get<CommentDto[]>(`posts/${postId}/comments`, {
        ...options,
      })
      .json();

    await response.forEach((res) => validateSchema(commentDtoSchema, res));
    return response;
  }

  /**
   * @tags comments
   * @summary Add comment
   * @request POST:/posts/{postId}/comments
   */
  async postPostsByPostIdComments(
    postId: string,
    data: CommentInputDto,
    kyInstance?: KyInstance,
    options?: Omit<Options, 'json'>
  ) {
    await validateSchema(commentInputDtoSchema, data);
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .post<CommentDto>(`posts/${postId}/comments`, {
        json: data,
        ...options,
      })
      .json();

    await validateSchema(commentDtoSchema, response);
    return response;
  }

  /**
   * @tags comments
   * @summary Update comment
   * @request PUT:/comments/{id}
   */
  async putCommentsById(
    id: string,
    data: CommentInputDto,
    kyInstance?: KyInstance,
    options?: Omit<Options, 'json'>
  ) {
    await validateSchema(commentInputDtoSchema, data);
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .put<CommentDto>(`comments/${id}`, {
        json: data,
        ...options,
      })
      .json();

    await validateSchema(commentDtoSchema, response);
    return response;
  }

  /**
   * @tags comments
   * @summary Delete comment
   * @request DELETE:/comments/{id}
   */
  async deleteCommentsById(id: string, kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .delete<void>(`comments/${id}`, {
        ...options,
      })
      .json();

    return response;
  }
}
