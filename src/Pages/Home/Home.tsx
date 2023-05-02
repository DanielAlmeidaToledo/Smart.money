import cn from 'classnames';
import { useContext } from 'react';

import './Home.scss';

import OverallBalance from '../../components/Home/OverallBalance/OverallBalance';

import UserContext from '../../contexts/UserContext';
import { UserProps } from '../../contexts/Props';
import Cards from '../../components/Home/Cards/Cards';
import Goal from '../../components/Home/Goal/Goal';

type HomeProps = {
  className?: string;
};

const Home: React.FC<HomeProps> = ({ className }) => {
  const User = useContext(UserContext) as UserProps;

  return (
    <div className={cn('__home-container', className)}>
      <div className={cn('__home-geral')}>
        <OverallBalance balance={User.balance} />
        <Cards />
        <Goal goal={User.goals[0]} />
      </div>
      <div className={cn('__home-transaction')}></div>
    </div>
  );
};

export default Home;
