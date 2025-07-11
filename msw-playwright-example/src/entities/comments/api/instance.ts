import { kyInstance } from '@/shared/api/instance';

import { CommentsApi } from './index';

const commentsApi = new CommentsApi(kyInstance);

export { commentsApi };
