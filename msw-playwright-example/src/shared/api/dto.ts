/** User */
export type UserDto = {
  /** @format uuid */
  id: string;
  username: string;
  /** @format email */
  email: string;
  /** @format date-time */
  createdAt?: string;
};

/** UserInput */
export type UserInputDto = {
  /**
   * @minLength 3
   * @maxLength 50
   */
  username: string;
  /** @format email */
  email: string;
};

/** Product */
export type ProductDto = {
  /** @format uuid */
  id: string;
  name: string;
  description?: string;
  /** @format float */
  price: number;
  stock: number;
  /** @format date-time */
  createdAt?: string;
};

/** ProductInput */
export type ProductInputDto = {
  /**
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /** @maxLength 500 */
  description?: string;
  /**
   * @format float
   * @min 0
   */
  price: number;
  /** @min 0 */
  stock: number;
};

/** Order */
export type OrderDto = {
  /** @format uuid */
  id: string;
  /** @format uuid */
  userId: string;
  items: OrderItemDto[];
  /** @format float */
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  /** @format date-time */
  createdAt?: string;
};

/** OrderItem */
export type OrderItemDto = {
  /** @format uuid */
  productId: string;
  /** @min 1 */
  quantity: number;
  /** @format float */
  price: number;
};

/** OrderInput */
export type OrderInputDto = {
  /** @format uuid */
  userId: string;
  items: {
    /** @format uuid */
    productId: string;
    /** @min 1 */
    quantity: number;
  }[];
};

/** Post */
export type PostDto = {
  /** @format uuid */
  id: string;
  title: string;
  content: string;
  /** @format uuid */
  userId: string;
  author?: UserDto;
  status: 'DRAFT' | 'PUBLISHED';
  tags?: string[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt?: string;
};

/** PostInput */
export type PostInputDto = {
  /**
   * @minLength 1
   * @maxLength 200
   */
  title: string;
  /** @minLength 1 */
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  tags?: string[];
};

/** Comment */
export type CommentDto = {
  /** @format uuid */
  id: string;
  content: string;
  /** @format uuid */
  userId: string;
  /** @format uuid */
  postId: string;
  author?: UserDto;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt?: string;
};

/** CommentInput */
export type CommentInputDto = {
  /**
   * @minLength 1
   * @maxLength 1000
   */
  content: string;
};

export type GetPostsQueryParams = {
  /**
   * @min 1
   * @default 1
   */
  page?: number;
  /**
   * @min 1
   * @max 50
   * @default 10
   */
  limit?: number;
};
