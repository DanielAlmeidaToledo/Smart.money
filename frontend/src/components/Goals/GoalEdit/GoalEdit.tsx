import cn from 'classnames';
import { useState } from 'react';
import axios from '../../../api/axios';
import Alert from '@mui/material/Alert';
import useAuthContext from '../../../contexts/AuthContext';

import './GoalEdit.scss';

type GoalEditProps = {
  className?: string;
  selectedGoal: any;
  onClose: () => void;
  searchGoals: () => void;
};

const GoalEdit: React.FC<GoalEditProps> = ({ className, selectedGoal, onClose, searchGoals }) => {
  const [title, setTitle] = useState(selectedGoal.title);
  const [type, setType] = useState(selectedGoal.type);
  const [amount, setAmount] = useState(selectedGoal.amount);
  const [balance, setBalance] = useState(selectedGoal.balance);
  const { user } = useAuthContext();

  const handleUpdate = () => {
    console.log(title, type, amount, balance);
    axios
      .patch(`/goals/${selectedGoal.id}`, {
        title: title,
        type: type,
        amount: amount,
        balance: balance
      })
      .then((response) => {
        onClose();
        searchGoals();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/goals/${selectedGoal.id}`)
      .then((response) => {
        onClose();
        searchGoals();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cn('__goal-edit-container', className)}>
      <div className={cn('__goal-edit-content')}>
        <div className={cn('__goal-edit-header')}>
          <h2>Adicionar Meta</h2>
          <button className={cn(className, 'button-close', 'Button')} onClick={onClose}>
            x
          </button>
        </div>
        <div className={cn('__goal-edit-body')}>
          <div className={cn('__goal-edit-body-input')}>
            <label htmlFor="title">Nome</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className={cn('__goal-edit-body-input', '__goal-edit-body-select')}>
            <label htmlFor="category">Categoria</label>
            <select
              name="category"
              id="category"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="OUTROS">Selecione</option>
              <option value="VIAGEM">Viagem</option>
              <option value="COMPRA">Compra</option>
              <option value="CASA">Casa</option>
              <option value="CARRO">Carro</option>
              <option value="ECONOMIA">Economia</option>
              <option value="OUTROS">Outros</option>
            </select>
          </div>

          <div className={cn('__goal-edit-body-div')}>
            <div className={cn('__goal-edit-body-input')}>
              <label htmlFor="balance">Atual</label>
              <input
                type="number"
                name="balance"
                id="balance"
                onChange={(e) => setBalance(Number(e.target.value))}
                value={balance}
              />
            </div>
            <div className={cn('__goal-edit-body-input')}>
              <label htmlFor="amount">Total</label>
              <input
                type="number"
                name="amount"
                id="amount"
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount}
              />
            </div>
          </div>

          <div className={cn('__goal-edit-body-buttons')}>
            <button className={cn(className, 'button-delete')} onClick={handleDelete}>
              excluir
            </button>
            <button className={cn(className, 'button-save', 'Button')} onClick={handleUpdate}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalEdit;
