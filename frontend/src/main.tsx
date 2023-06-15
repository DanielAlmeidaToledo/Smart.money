import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Settings from './Pages/Settings/Settings';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/" element={<App />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/extrato" element={<Statement />} />
            <Route path="/cartoes" element={<CardsList />} />
            <Route path="/metas" element={<Goals />} />
            <Route path="/ajustes" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
