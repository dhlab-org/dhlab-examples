import type { PropsWithChildren } from 'react';

import { ZodValidationError } from '@/shared/api/utils.gen';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: (failureCount, error) => {
        if (error instanceof ZodValidationError) {
          return false;
        }

        if (error instanceof HTTPError) {
          if (error.response.status === 404) return false;
        }

        return failureCount < 2;
      },
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      void queryClient.invalidateQueries({
        queryKey: [mutation.options.mutationKey?.at(0)],
        exact: false,
      });
    },
  }),
});

export const TanstackQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
