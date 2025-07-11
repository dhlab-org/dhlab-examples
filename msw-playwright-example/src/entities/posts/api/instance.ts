import { kyInstance } from '@/shared/api/instance';

import { PostsApi } from './index';

const postsApi = new PostsApi(kyInstance);

export { postsApi };
