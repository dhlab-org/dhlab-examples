import type { HttpResponseResolver } from "msw";
import type { CommentInputDto, CommentDto } from "@/shared/api/dto";

export type TCommentsControllers = {
  getUpdateComment200Response: (
    info: Parameters<HttpResponseResolver<{ id: string }, CommentInputDto>>[0],
  ) => CommentDto | Promise<CommentDto>;

  getUpdateComment404Response: (
    info: Parameters<HttpResponseResolver<{ id: string }, CommentInputDto>>[0],
  ) => null | Promise<null>;

  getDeleteComment204Response: (
    info: Parameters<HttpResponseResolver<{ id: string }, null>>[0],
  ) => null | Promise<null>;

  getDeleteComment404Response: (
    info: Parameters<HttpResponseResolver<{ id: string }, null>>[0],
  ) => null | Promise<null>;
};
