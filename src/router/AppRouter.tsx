import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ErrorBoundary, ErrorPage } from '@components/ErrorComponents/';
import { PokemonDetail } from '@components/PokemonCard';
import AboutPage from '@pages/AboutPage';
import { MainLayout, MainPage } from '@pages/MainPage';
import NotFoundPage from '@pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="main" replace />,
      },
      {
        path: 'main',
        element: (
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        ),
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary>
                <PokemonDetail />
              </ErrorBoundary>
            ),
          },
        ],
      },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
