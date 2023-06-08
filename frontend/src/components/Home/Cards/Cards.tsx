import cn from 'classnames';

import './Cards.scss';

import Paper from '../Paper/Paper';
import PaperHeader from '../Paper/PaperHeader';

type CardsProps = {
  className?: string;
};

const Cards: React.FC<CardsProps> = ({ className }) => {
  return (
    <Paper>
      <PaperHeader>
        <h1>Cartões</h1>
        <a href="/cartoes">
          <span className="material-symbols-outlined">query_stats</span>
        </a>
      </PaperHeader>
      <div className={cn('__cards-content', className)}>
        <div className={cn('__cards-total')}>
          <div className={cn('__cards-header')}>
            <span>CreditCard</span>
            <span>Smart.money</span>
          </div>
          <div className={cn('__cards-info')}>
            <p>XXXX XXXX XXXX XXXX</p>
            <span>Smart.money</span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Cards;
