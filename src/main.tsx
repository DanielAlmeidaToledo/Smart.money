import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/_reset.scss';
import './styles/main.scss';

import App from './App';
import Dashboard from './Pages/Dashboard/Dashboard';
// import Signup from './Pages/Signup/Signup';
// import ConfirmSignup from './Pages/ConfirmSignup/ConfirmSignup';
// import Signin from './Pages/Signin/Signin';

const router = createBrowserRouter(
  [
    {
      path: '',
      element: <App />,
      children: [
        {
          index: true,
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
    // {
    //   path: '/registro',
    //   element: <Signup />
    // },
    // {
    //   path: '/confirmar-registro',
    //   element: <ConfirmSignup />
    // },
    // {
    //   path: '/login',
    //   element: <Signin />
    // }
  ],
  { basename: import.meta.env.VITE_BASENAME }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
