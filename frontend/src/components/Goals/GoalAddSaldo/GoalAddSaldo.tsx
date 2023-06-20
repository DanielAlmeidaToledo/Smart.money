import cn from 'classnames';
import { useState } from 'react';
import axios from '../../../api/axios';
import Alert from '@mui/material/Alert';
import useAuthContext from '../../../contexts/AuthContext';

import './GoalAddSaldo.scss';

type GoalAddSaldoProps = {
  className?: string;
  selectedGoal: any;
  onClose: () => void;
  searchGoals: () => void;
};

const GoalAddSaldo: React.FC<GoalAddSaldoProps> = ({
  className,
  selectedGoal,
  onClose,
  searchGoals
}) => {
  const [balance, setBalance] = useState(0);
  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .patch(`/goals/${selectedGoal.id}`, {
        user_id: user?.id,
        balance: balance
      })
      .then((response) => {
        onClose();
        searchGoals();
        return <Alert severity="success">Saldo adicionado com sucesso!</Alert>;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cn('__goal-add-modal-container', className)}>
      <div className={cn('__goal-add-modal-content')}>
        <div className={cn('__goal-add-modal-header')}>
          <h2>Adicionar Saldo</h2>
          <button className={cn(className, 'button-close', 'Button')} onClick={onClose}>
            x
          </button>
        </div>
        <div className={cn('__goal-add-modal-body')}>
          <form onSubmit={handleSubmit}>
            <div className={cn('__goal-add-modal-body-input')}>
              <label htmlFor="balance">Valor</label>
              <input
                type="number"
                name="balance"
                id="balance"
                onChange={(e) => setBalance(Number(e.target.value))}
              />
            </div>

            <div className={cn('__goal-add-modal-body-buttons')}>
              <button className={cn(className, 'button-cancel', 'Button')} onClick={onClose}>
                Cancelar
              </button>
              <button className={cn(className, 'button-save', 'Button')} type="submit">
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoalAddSaldo;
