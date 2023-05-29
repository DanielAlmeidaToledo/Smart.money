import cn from 'classnames';
import { useContext } from 'react';

import './Home.scss';

import OverallBalance from '../../components/Home/OverallBalance/OverallBalance';

import UserContext from '../../contexts/UserContext';
import { UserProps } from '../../contexts/Props';
import Cards from '../../components/Home/Cards/Cards';
import Goal from '../../components/Home/GoalCard/GoalCard';
import Transactions from '../../components/Home/Transactions/Transactions';

type HomeProps = {
  className?: string;
};

const Home: React.FC<HomeProps> = ({ className }) => {
  const user = useContext(UserContext) as UserProps;

  return (
    <div className={cn('__home-container', className)}>
      <div className={cn('__home-geral')}>
        <OverallBalance balance={user.balance} />
        <Cards />
        <Goal goal={user.goals[0]} />
      </div>
      <div className={cn('__home-transaction')}>
        <Transactions transactions={user.transactions} />
      </div>
    </div>
  );
};

export default Home;
