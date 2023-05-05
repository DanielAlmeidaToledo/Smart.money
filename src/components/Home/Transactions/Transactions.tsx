import cn from 'classnames';

import './Transactions.scss';

import Paper from '../Paper/Paper';
import PaperHeader from '../Paper/PaperHeader';

type TransactionsProps = {
  className?: string;
};

const Transactions: React.FC<TransactionsProps> = ({ className }) => {
  return (
    <Paper className="__paper-container-full">
      <PaperHeader>
        <h1>Transações</h1>
        <button>
          <span className="material-symbols-outlined">add</span>
        </button>
      </PaperHeader>
      <div className={cn('__transactions-content', className)}></div>
    </Paper>
  );
};

export default Transactions;
