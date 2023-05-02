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
        <button>
          <span className="material-symbols-outlined">add</span>
        </button>
      </PaperHeader>
      <div className={cn('__cards-content', className)}>Cartões</div>
    </Paper>
  );
};

export default Cards;
