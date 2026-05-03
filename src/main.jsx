import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes/Router.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeContextProvider } from './contexts/ThemeContext.jsx';

const queryClient = new QueryClient()

// Apply saved theme ASAP (prevents flash)
const savedTheme = localStorage.getItem('transitly-theme');
document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : 'light');

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AuthProvider>
          <RouterProvider router={Router} />
        </AuthProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
