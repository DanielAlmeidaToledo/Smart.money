import cn from 'classnames';
import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import useAuthContext from '../../contexts/AuthContext';

import './Home.scss';

import Cards from '../../components/Home/Cards/Cards';
import Goal from '../../components/Home/GoalCard/GoalCard';
import Transactions from '../../components/Home/Transactions/Transactions';
import OverallBalance from '../../components/Home/OverallBalance/OverallBalance';

type HomeProps = {
  className?: string;
};

const Home: React.FC<HomeProps> = ({ className }) => {
  const { user } = useAuthContext();

  const [goals, setGoals] = useState({
    id: 0,
    title: '',
    type: '',
    amount: 0,
    balance: 0
  });
  const [transactions, setTransactions] = useState([
    {
      id: 0,
      title: '',
      type: '',
      category: '',
      amount: 0,
      created_at: new Date()
    }
  ]);

  const searchData = async () => {
    if (user && user.id) {
      await axios.get(`/goals/user/${user.id}`).then((response) => {
        if (response.data) {
          setGoals(response.data[0]);
        }
      });
      await axios.get(`/transactions/user/${user.id}`).then((response) => {
        setTransactions(response.data);
      });
    }
  };

  useEffect(() => {
    if (user && !user.id) {
      return;
    }
    searchData();
  }, [user]);

  const totalBalance = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + Number(transaction.amount);
    } else {
      return acc - Number(transaction.amount);
    }
  }, 0);

  return (
    <div className={cn('__home-container', className)}>
      <div className={cn('__home-geral')}>
        <OverallBalance balance={totalBalance} />
        <Cards />
        <Goal goal={goals} />
      </div>
      <div className={cn('__home-transaction')}>
        <Transactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Home;
