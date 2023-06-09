import { useEffect } from 'react';
import cn from 'classnames';
import useAuthContext from '../../contexts/AuthContext';

import './Home.scss';

import OverallBalance from '../../components/Home/OverallBalance/OverallBalance';

import Cards from '../../components/Home/Cards/Cards';
import Goal from '../../components/Home/GoalCard/GoalCard';
import Transactions from '../../components/Home/Transactions/Transactions';

type HomeProps = {
  className?: string;
};

const user2 = {
  id: 1,
  name: 'Daniel Toledo',
  email: 'danieltoledo.dev@gmail.com',
  balance: 3297.98,
  transactions: [
    {
      id: 1,
      title: 'Almoço - Restaurante',
      type: 'gasto',
      category: 'comida',
      amount: 350,
      date: new Date('2023-01-05 12:00:00')
    },
    {
      id: 2,
      title: 'Salário',
      type: 'receita',
      category: 'salario',
      amount: 1500.0,
      date: new Date('2023-05-05 17:00:00')
    },
    {
      id: 3,
      title: 'Compras no shopping',
      type: 'gasto',
      category: 'roupas',
      amount: 589.9,
      date: new Date('2023-07-05 14:00:00')
    },
    {
      id: 4,
      title: 'Posto de combustível',
      type: 'gasto',
      category: 'roupas',
      amount: 940.0,
      date: new Date('2023-10-05 07:40:00')
    }
  ],
  goals: [
    {
      id: 1,
      title: 'Viagem para o Caribe',
      type: 'viagem',
      amount: 20000,
      balance: 14600
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

const Home: React.FC<HomeProps> = ({ className }) => {
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    // if (!user) {
    //   getUser('2d8936f0-7ba2-4b30-b8ca-b1d96b4706cc');
    // }
    console.log(user);
  }, []);

  return (
    <div className={cn('__home-container', className)}>
      <div className={cn('__home-geral')}>
        <OverallBalance balance={user2.balance} />
        <Cards />
        <Goal goal={user2.goals[0]} />
      </div>
      <div className={cn('__home-transaction')}>
        <Transactions transactions={user2.transactions} />
      </div>
    </div>
  );
};

export default Home;
