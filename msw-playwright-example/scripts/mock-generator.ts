import { createRequire } from 'node:module';
import type { TOptions } from '@dhlab/msw-auto-mock';
import type { TControllers } from '../src/app/mocks/__types__/controllers/index';
import { controllers } from '../src/app/mocks/controllers';

const require = createRequire(import.meta.url);
const { generateMocks } = require('@dhlab/msw-auto-mock/node');

async function autoGenerateMocks() {
  try {
    console.log('[MSW] 목 파일 생성 시작...');

    const options: TOptions<TControllers> = {
      controllers,
      input: './swagger/openapi.yml',
      outputDir: './src/app/mocks',
      environment: 'react',
      baseUrl: 'https://example.com/api/v1',
    };

    const result = await generateMocks(options);

    console.log('[MSW] 목 파일 생성 완료!');
    console.log('[MSW] 생성된 파일 경로:', result.targetFolder);

    return result;
  } catch (error) {
    console.error('[MSW] 목 파일 생성 중 오류 발생:', error);
    throw error;
  }
}

autoGenerateMocks();
