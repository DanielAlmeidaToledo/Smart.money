import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

import axios from './api/axios';
import { useState, useEffect } from 'react';

import './styles/main.scss';

import { Outlet } from 'react-router-dom';
import { TransactionProps } from './contexts/Props';

export type ContextType = { transactions: TransactionProps[] | null };

function App() {
  const [transactions, setTransactions] = useState<ContextType>();

  useEffect(() => {
    axios
      .get('/transactions')
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="__content-and-sidebar-wrapper">
      <Sidebar />
      <div className="__app-content">
        <Header />
        <Outlet context={{ transactions }} />
      </div>
    </div>
  );
}

export default App;
