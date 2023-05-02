import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

import UserContext from './contexts/UserContext';

import './styles/main.scss';

import { Outlet } from 'react-router-dom';

// Posteriormente vai ser substituido por uma chamada a API
const UserValue = {
  name: 'Daniel Toledo',
  email: 'danieltoledo.dev@gmail.com',
  transactions: [
    {
      id: 1,
      title: 'Almoço - Restaurante',
      type: 'gasto',
      category: 'comida',
      amount: 150,
      date: new Date('2023-01-05 12:00:00')
    },
    {
      id: 2,
      title: 'Salário',
      type: 'receita',
      category: 'salario',
      amount: 3500.0,
      date: new Date('2023-01-05 17:00:00')
    },
    {
      id: 3,
      title: 'Compras no shopping',
      type: 'gasto',
      category: 'roupas',
      amount: 189.9,
      date: new Date('2023-02-05 14:00:00')
    },
    {
      id: 4,
      title: 'Posto de combustível',
      type: 'gasto',
      category: 'roupas',
      amount: 140.0,
      date: new Date('2023-03-05 07:40:00')
    }
  ],
  cards: [
    {
      id: 1,
      title: 'Nubank',
      type: 'credito',
      limit: 5000,
      balance: 1000
    },
    {
      id: 2,
      title: 'Inter',
      type: 'credito',
      limit: 6000,
      balance: 2300
    }
  ],
  goals: [
    {
      id: 1,
      title: 'Viagem para o Caribe',
      type: 'viagem',
      amount: 12000,
      balance: 1000
    },
    {
      id: 2,
      title: 'Macbook Pro',
      type: 'compra',
      amount: 8000,
      balance: 2000
    }
  ]
};

function App() {
  return (
    <UserContext.Provider value={UserValue}>
      <div className="__content-and-sidebar-wrapper">
        <Sidebar />
        <div className="__app-content">
          <Header />
          <Outlet />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
