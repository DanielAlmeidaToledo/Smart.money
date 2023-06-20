import cn from 'classnames';
import { useState } from 'react';
import axios from '../../../api/axios';
import Alert from '@mui/material/Alert';
import useAuthContext from '../../../contexts/AuthContext';

import './GoalModal.scss';

type GoalModalProps = {
  className?: string;
  onClose: () => void;
  searchGoals: () => void;
};

const GoalModal: React.FC<GoalModalProps> = ({ className, onClose, searchGoals }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`/goals`, {
        user_id: user?.id,
        title: title,
        type: type,
        amount: amount,
        balance: balance
      })
      .then((response) => {
        onClose();
        searchGoals();
        return <Alert severity="success">Meta adicionada com sucesso!</Alert>;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cn('__goal-modal-container', className)}>
      <div className={cn('__goal-modal-content')}>
        <div className={cn('__goal-modal-header')}>
          <h2>Adicionar Meta</h2>
          <button className={cn(className, 'button-close', 'Button')} onClick={onClose}>
            x
          </button>
        </div>
        <div className={cn('__goal-modal-body')}>
          <form onSubmit={handleSubmit}>
            <div className={cn('__goal-modal-body-input')}>
              <label htmlFor="title">Nome</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={cn('__goal-modal-body-input', '__goal-modal-body-select')}>
              <label htmlFor="category">Categoria</label>
              <select name="category" id="category" onChange={(e) => setType(e.target.value)}>
                <option value="OUTROS">Selecione</option>
                <option value="VIAGEM">Viagem</option>
                <option value="COMPRA">Compra</option>
                <option value="CASA">Casa</option>
                <option value="CARRO">Carro</option>
                <option value="ECONOMIA">Economia</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>

            <div className={cn('__goal-modal-body-div')}>
              <div className={cn('__goal-modal-body-input')}>
                <label htmlFor="balance">Atual</label>
                <input
                  type="number"
                  name="balance"
                  id="balance"
                  onChange={(e) => setBalance(Number(e.target.value))}
                />
              </div>
              <div className={cn('__goal-modal-body-input')}>
                <label htmlFor="amount">Total</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            </div>

            <div className={cn('__goal-modal-body-buttons')}>
              <button className={cn(className, 'button-cancel', 'Button')} onClick={onClose}>
                Cancelar
              </button>
              <button className={cn(className, 'button-save', 'Button')} type="submit">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoalModal;
