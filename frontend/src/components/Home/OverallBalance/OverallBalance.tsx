import cn from 'classnames';

import { useState } from 'react';

import './OverallBalance.scss';

import Paper from '../Paper/Paper';
import PaperHeader from '../Paper/PaperHeader';

type OverallBalanceProps = {
  className?: string;
  balance?: number;
};

const OverallBalance: React.FC<OverallBalanceProps> = ({ className, balance }) => {
  const [balanceDate, setBalanceDate] = useState<Date>(new Date());

  return (
    <Paper>
      <PaperHeader>
        <h1>Saldo Geral</h1>
        <button onClick={() => setBalanceDate(new Date())}>
          <span className="material-symbols-outlined">update</span>
        </button>
      </PaperHeader>
      <div className={cn('__overall-balance-content', className)} style={{ color: balance && balance < 0 ? '#ff5050' : '#1CA477' }}>
        {balance !== undefined ? balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}
      </div>
      <div className={cn('__overall-balance-footer')}>
        <span>
          Atualizado em{' '}
          {balanceDate.toLocaleDateString('pt', {
            month: '2-digit',
            year: '2-digit',
            day: '2-digit'
          })}{' '}
          às {balanceDate.getHours() + ':' + balanceDate.getMinutes()}
        </span>
      </div>
    </Paper>
  );
};

export default OverallBalance;
