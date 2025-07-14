import type { TScenarioConfig } from './__types__/scenarios/scenarios.type';

/**
 * MSW 시나리오 설정
 *
 * 헤더 'x-scenario'를 통해 특정 시나리오를 활성화할 수 있습니다.
 *
 * 예시:
 * - 기본 (헤더 없음): 성공 응답 (200-299)
 * - curl -H "x-scenario: success" /api/users
 * - curl -H "x-scenario: error" /api/users
 *
 * allowCustomStatus: true를 사용하면 OpenAPI 명세에 없는 status 코드도 사용 가능합니다.
 */
export const scenarios: TScenarioConfig = {
  'TC-1.1': {
    description: '유저 ID를 입력하면 로그인되어야 한다',
    api: {
      '/login': {
        POST: { status: 200 },
      },
    },
  },
  'TC-1.2': {
    description: '존재하지 않는 id로 로그인을 시도하는 경우 실패 모달이 떠야 한다',
    api: {
      '/login': {
        POST: { status: 400 },
      },
    },
  },
  'TC-2.1': {
    description: '게시글 목록 > 게시글 조회 성공',
    api: {
      '/posts': {
        GET: { status: 200 },
      },
      '/posts/:id': {
        GET: { status: 200 },
      },
    },
  },
  'TC-2.2': {
    description: '존재하지 않는 게시글에 접근했을 때 메시지가 떠야 한다',
    api: {
      '/posts/:id': {
        GET: { status: 200 },
      },
    },
  },
  'TC-3.1': {
    description: '댓글 작성 성공',
    api: {
      '/posts/:postId/comments': {
        GET: { status: 200 },
      },
    },
  },
  'TC-3.2': {
    description: '댓글 작성 실패',
    api: {
      '/posts/:postId/comments': {
        POST: { status: 500, allowCustomStatus: true },
      },
    },
  },
};
