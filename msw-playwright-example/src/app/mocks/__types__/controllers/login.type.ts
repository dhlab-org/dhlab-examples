import type { HttpResponseResolver } from "msw";
import type { LoginInputDto, UserDto } from "@/shared/api/dto";

export type TLoginControllers = {
  getLogin200Response: (
    info: Parameters<
      HttpResponseResolver<Record<string, never>, LoginInputDto>
    >[0],
  ) => UserDto | Promise<UserDto>;

  getLogin400Response: (
    info: Parameters<
      HttpResponseResolver<Record<string, never>, LoginInputDto>
    >[0],
  ) => null | Promise<null>;

  getLogin401Response: (
    info: Parameters<
      HttpResponseResolver<Record<string, never>, LoginInputDto>
    >[0],
  ) => null | Promise<null>;
};
