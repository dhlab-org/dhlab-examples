import { kyInstance } from '@/shared/api/instance';

import { AuthApi } from './index';

const authApi = new AuthApi(kyInstance);

export { authApi };
