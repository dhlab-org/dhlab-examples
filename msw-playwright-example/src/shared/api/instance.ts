import ky from 'ky';

export const kyInstance = ky.create({
  prefixUrl: 'https://example.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default kyInstance;
