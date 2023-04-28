import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/_reset.scss';
import './styles/main.scss';

import App from './App';
import LandingPage from './Pages/LandingPage/LandingPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '',
      element: <App />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/comercios',
          element: <Dashboard />
        },
        {
          path: '/inquilinos',
          element: <Dashboard />
        },
        {
          path: '/usuarios',
          element: <Dashboard />
        }
      ],
      errorElement: <div>404</div>
    },
    {
      path: '/login',
      element: <Login />
    },
  ],
  { basename: import.meta.env.VITE_BASENAME }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
