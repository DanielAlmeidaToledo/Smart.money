import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/_reset.scss';
import './styles/main.scss';

import App from './App';
import LandingPage from './Pages/LandingPage/LandingPage';
import Home from './Pages/Home/Home';
import Statement from './Pages/Statement/Statement';
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
          element: <Statement />
        },
        {
          path: '/cartoes',
          element: <Statement />
        },
        {
          path: '/metas',
          element: <Statement />
        },
        {
          path: '/ajustes',
          element: <Statement />
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