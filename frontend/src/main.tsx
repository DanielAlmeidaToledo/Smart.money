import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/_reset.scss';
import './styles/main.scss';

import App from './App';
import LandingPage from './Pages/LandingPage/LandingPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

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
          path: '/inicio',
          element: <Home />
        },
        {
          path: '/extrato',
          element: <Home />
        },
        {
          path: '/cartoes',
          element: <Home />
        },
        {
          path: '/metas',
          element: <Home />
        },
        {
          path: '/ajustes',
          element: <Home />
        }
      ],
      errorElement: <div>404</div>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/cadastro',
      element: <Register />
    }
  ],
  { basename: import.meta.env.VITE_BASENAME }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
