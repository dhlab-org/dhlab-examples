import type { ZodSchema } from 'zod';

export class ZodValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ZodValidationError';
  }
}

export const validateSchema = (schema: ZodSchema | null, data: unknown) => {
  if (!schema) return data;

  const result = schema.safeParse(data);

  if (!result.success) {
    const errorMessage = result.error.errors.map((err) => `Path: ${err.path.join('.')} - ${err.message}`).join('\n');

    const error = new ZodValidationError(
      `❌ Invalid data according to zod schema:\n${errorMessage}\n\n🔍 Received data: ${JSON.stringify(data, null, 2)}`
    );

    console.error(error);

    throw error;
  }

  return data;
};

export const createSearchParams = (
  params?: Record<string, string | number | boolean | Array<string | number | boolean>>
): URLSearchParams => {
  const urlSearchParams = new URLSearchParams();

  if (params) {
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => {
        const values = Array.isArray(value) ? value : [value];
        values.forEach((v) => urlSearchParams.append(key, v.toString()));
      });
  }

  return urlSearchParams;
};
