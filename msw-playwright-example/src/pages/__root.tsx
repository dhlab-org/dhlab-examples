import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanstackQueryProvider } from '@/app/provider/tanstack-query';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <TanstackQueryProvider>
      <Outlet />
    </TanstackQueryProvider>
  );
}
