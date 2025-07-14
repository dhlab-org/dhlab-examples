import type {
  CommentDto,
  CommentInputDto,
  GetPostsQueryParams,
  LoginInputDto,
  OrderDto,
  OrderInputDto,
  OrderItemDto,
  PostDto,
  PostInputDto,
  ProductDto,
  ProductInputDto,
  UserDto,
  UserInputDto,
} from './dto';
import {
  commentDtoSchema,
  commentInputDtoSchema,
  getPostsQueryParamsSchema,
  loginInputDtoSchema,
  orderDtoSchema,
  orderInputDtoSchema,
  orderItemDtoSchema,
  postDtoSchema,
  postInputDtoSchema,
  productDtoSchema,
  productInputDtoSchema,
  userDtoSchema,
  userInputDtoSchema,
} from './schema.gen';

export const isLoginInputDto = (data: unknown): data is LoginInputDto => {
  return loginInputDtoSchema.safeParse(data).success;
};

export const isUserDto = (data: unknown): data is UserDto => {
  return userDtoSchema.safeParse(data).success;
};

export const isUserInputDto = (data: unknown): data is UserInputDto => {
  return userInputDtoSchema.safeParse(data).success;
};

export const isProductDto = (data: unknown): data is ProductDto => {
  return productDtoSchema.safeParse(data).success;
};

export const isProductInputDto = (data: unknown): data is ProductInputDto => {
  return productInputDtoSchema.safeParse(data).success;
};

export const isOrderDto = (data: unknown): data is OrderDto => {
  return orderDtoSchema.safeParse(data).success;
};

export const isOrderItemDto = (data: unknown): data is OrderItemDto => {
  return orderItemDtoSchema.safeParse(data).success;
};

export const isOrderInputDto = (data: unknown): data is OrderInputDto => {
  return orderInputDtoSchema.safeParse(data).success;
};

export const isPostDto = (data: unknown): data is PostDto => {
  return postDtoSchema.safeParse(data).success;
};

export const isPostInputDto = (data: unknown): data is PostInputDto => {
  return postInputDtoSchema.safeParse(data).success;
};

export const isCommentDto = (data: unknown): data is CommentDto => {
  return commentDtoSchema.safeParse(data).success;
};

export const isCommentInputDto = (data: unknown): data is CommentInputDto => {
  return commentInputDtoSchema.safeParse(data).success;
};

export const isGetPostsQueryParams = (data: unknown): data is GetPostsQueryParams => {
  return getPostsQueryParamsSchema.safeParse(data).success;
};
