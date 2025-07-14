import type { KyInstance, Options } from 'ky';
import type { LoginInputDto, UserDto } from '@/shared/api/dto';
import { loginInputDtoSchema, userDtoSchema } from '@/shared/api/schema.gen';
import { validateSchema } from '@/shared/api/utils.gen';

export class AuthApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  /**
   * @tags auth
   * @summary User login
   * @request POST:/login
   */
  async postLogin(data: LoginInputDto, kyInstance?: KyInstance, options?: Omit<Options, 'json'>) {
    await validateSchema(loginInputDtoSchema, data);
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .post<UserDto>(`login`, {
        json: data,
        ...options,
      })
      .json();

    await validateSchema(userDtoSchema, response);
    return response;
  }
}
