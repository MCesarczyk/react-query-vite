import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { App } from './App';
import { fetchContributors } from './fetchContributors';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,
      cacheTime: 1_000 * 60 * 5,
      retry: 5,
      queryFn: fetchContributors,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
