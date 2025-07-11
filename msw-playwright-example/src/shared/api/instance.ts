import ky from 'ky'

export const kyInstance = ky.create({
  prefixUrl: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default kyInstance 