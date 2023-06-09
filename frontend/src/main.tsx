import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import './styles/_reset.scss';
import './styles/main.scss';

import App from './App';
import LandingPage from './Pages/LandingPage/LandingPage';
import Home from './Pages/Home/Home';
import Statement from './Pages/Statement/Statement';
import Goals from './Pages/Goals/Goals';
import CardsList from './Pages/CardsList/CardsList';
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
          path: '/dashboard',
          element: <Home />
        },
        {
          path: '/extrato',
          element: <Statement />
        },
        {
          path: '/cartoes',
          element: <CardsList />
        },
        {
          path: '/metas',
          element: <Goals />
        },
        {
          path: '/ajustes',
          element: <CardsList />
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
