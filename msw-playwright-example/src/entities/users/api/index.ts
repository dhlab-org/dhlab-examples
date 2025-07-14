import type { KyInstance, Options } from 'ky';
import type { UserDto, UserInputDto } from '@/shared/api/dto';
import { userDtoSchema, userInputDtoSchema } from '@/shared/api/schema.gen';
import { validateSchema } from '@/shared/api/utils.gen';

export class UsersApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  /**
   * @tags users
   * @summary Get all users
   * @request GET:/users
   */
  async getUsers(kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .get<UserDto[]>(`users`, {
        ...options,
      })
      .json();

    await response.forEach((res) => validateSchema(userDtoSchema, res));
    return response;
  }

  /**
   * @tags users
   * @summary Create a new user
   * @request POST:/users
   */
  async postUsers(data: UserInputDto, kyInstance?: KyInstance, options?: Omit<Options, 'json'>) {
    await validateSchema(userInputDtoSchema, data);
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .post<UserDto>(`users`, {
        json: data,
        ...options,
      })
      .json();

    await validateSchema(userDtoSchema, response);
    return response;
  }

  /**
   * @tags users
   * @summary Get user by ID
   * @request GET:/users/{id}
   */
  async getUsersById(id: string, kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .get<UserDto>(`users/${id}`, {
        ...options,
      })
      .json();

    await validateSchema(userDtoSchema, response);
    return response;
  }
}
