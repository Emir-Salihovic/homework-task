import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from '@homework-task/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("No element with id 'root' found");
}

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ToastContainer position="top-right" />
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
