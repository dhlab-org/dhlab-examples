import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { Toaster } from '@/shared/ui/sonner';
import { router } from './app/routes/router';

async function enableMocking() {
  const { worker } = await import('./app/mocks/browser.ts');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

if (typeof global === 'undefined') {
  window.global = window;
}

enableMocking().then(() => {
  // biome-ignore lint/style/noNonNullAssertion: react 진입점
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </StrictMode>
  );
});
