import { createBrowserRouter } from 'react-router-dom';

import AboutPage from '@pages/AboutPage';
import { MainLayout, MainPage } from '@pages/MainPage';
import NotFoundPage from '@pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      { path: 'about', element: <AboutPage /> },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
