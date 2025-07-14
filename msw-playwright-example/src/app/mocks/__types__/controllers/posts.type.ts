import type { HttpResponseResolver } from 'msw';
import type { CommentDto, CommentInputDto, PostDto, PostInputDto } from '@/shared/api/dto';

export type TPostsControllers = {
  getGetPosts200Response: (
    info: Parameters<HttpResponseResolver<Record<string, never>, null>>[0]
  ) => null | Promise<null>;

  getCreatePost201Response: (
    info: Parameters<HttpResponseResolver<Record<string, never>, PostInputDto>>[0]
  ) => PostDto | Promise<PostDto>;

  getCreatePost400Response: (
    info: Parameters<HttpResponseResolver<Record<string, never>, PostInputDto>>[0]
  ) => null | Promise<null>;

  getGetPostById200Response: (
    info: Parameters<HttpResponseResolver<{ id: string }, null>>[0]
  ) => PostDto | Promise<PostDto>;

  getGetPostById404Response: (info: Parameters<HttpResponseResolver<{ id: string }, null>>[0]) => null | Promise<null>;

  getUpdatePost200Response: (
    info: Parameters<HttpResponseResolver<{ id: string }, PostInputDto>>[0]
  ) => PostDto | Promise<PostDto>;

  getUpdatePost404Response: (
    info: Parameters<HttpResponseResolver<{ id: string }, PostInputDto>>[0]
  ) => null | Promise<null>;

  getDeletePost204Response: (info: Parameters<HttpResponseResolver<{ id: string }, null>>[0]) => null | Promise<null>;

  getDeletePost404Response: (info: Parameters<HttpResponseResolver<{ id: string }, null>>[0]) => null | Promise<null>;

  getGetPostComments200Response: (
    info: Parameters<HttpResponseResolver<{ postId: string }, null>>[0]
  ) => CommentDto[] | Promise<CommentDto[]>;

  getCreateComment201Response: (
    info: Parameters<HttpResponseResolver<{ postId: string }, CommentInputDto>>[0]
  ) => CommentDto | Promise<CommentDto>;

  getCreateComment404Response: (
    info: Parameters<HttpResponseResolver<{ postId: string }, CommentInputDto>>[0]
  ) => null | Promise<null>;
};
