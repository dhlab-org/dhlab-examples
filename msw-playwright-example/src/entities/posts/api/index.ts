import type { KyInstance, Options } from 'ky';
import type { GetPostsQueryParams, PostDto, PostInputDto } from '@/shared/api/dto';
import { postDtoSchema, postInputDtoSchema } from '@/shared/api/schema.gen';
import { createSearchParams, validateSchema } from '@/shared/api/utils.gen';

export class PostsApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  /**
   * @tags posts
   * @summary Get all posts
   * @request GET:/posts
   */
  async getPosts(params?: GetPostsQueryParams, kyInstance?: KyInstance, options?: Omit<Options, 'searchParams'>) {
    const instance = kyInstance ?? this.instance;
    const urlSearchParams = createSearchParams(params);

    const response = await instance
      .get<{
        items?: PostDto[];
        total?: number;
        page?: number;
        totalPages?: number;
      }>(`posts`, {
        searchParams: urlSearchParams,
        ...options,
      })
      .json();

    await response.items?.forEach((res) => validateSchema(postDtoSchema, res));
    return response;
  }

  /**
   * @tags posts
   * @summary Create a new post
   * @request POST:/posts
   */
  async postPosts(data: PostInputDto, kyInstance?: KyInstance, options?: Omit<Options, 'json'>) {
    await validateSchema(postInputDtoSchema, data);
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .post<PostDto>(`posts`, {
        json: data,
        ...options,
      })
      .json();

    await validateSchema(postDtoSchema, response);
    return response;
  }

  /**
   * @tags posts
   * @summary Get post by ID
   * @request GET:/posts/{id}
   */
  async getPostsById(id: string, kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .get<PostDto>(`posts/${id}`, {
        ...options,
      })
      .json();

    await validateSchema(postDtoSchema, response);
    return response;
  }

  /**
   * @tags posts
   * @summary Update post
   * @request PUT:/posts/{id}
   */
  async putPostsById(id: string, data: PostInputDto, kyInstance?: KyInstance, options?: Omit<Options, 'json'>) {
    await validateSchema(postInputDtoSchema, data);
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .put<PostDto>(`posts/${id}`, {
        json: data,
        ...options,
      })
      .json();

    await validateSchema(postDtoSchema, response);
    return response;
  }

  /**
   * @tags posts
   * @summary Delete post
   * @request DELETE:/posts/{id}
   */
  async deletePostsById(id: string, kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .delete<void>(`posts/${id}`, {
        ...options,
      })
      .json();

    return response;
  }
}
