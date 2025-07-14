import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexComponent,
  beforeLoad: async () => {
    throw redirect({ to: '/login' });
  },
});

function IndexComponent() {
  return null;
}
