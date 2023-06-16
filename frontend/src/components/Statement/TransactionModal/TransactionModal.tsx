import cn from 'classnames';
import { useState } from 'react';
import axios from '../../../api/axios';
import useAuthContext from '../../../contexts/AuthContext';

import './TransactionModal.scss';

type TransactionModalProps = {
  className?: string;
  onClose: () => void;
};

const TransactionModal: React.FC<TransactionModalProps> = ({ className, onClose }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`/transactions`, {
        user_id: user?.id,
        title: title,
        type: type,
        amount: amount,
        category: category
      })
      .then((response) => {
        console.log(response);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cn('__transaction-modal-container', className)}>
      <div className={cn('__transaction-modal-content')}>
        <div className={cn('__transaction-modal-header')}>
          <h2>Adicionar transação</h2>
          <button className={cn(className, 'button-close', 'Button')} onClick={onClose}>
            x
          </button>
        </div>
        <div className={cn('__transaction-modal-body')}>
          <form onSubmit={handleSubmit}>
            <div className={cn('__transaction-modal-body-input')}>
              <label htmlFor="title">Nome</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div
              className={cn('__transaction-modal-body-input', '__transaction-modal-body-select')}
            >
              <label htmlFor="type">Tipo</label>
              <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
                <option value="all">Selecione</option>
                <option value="expense">Gasto</option>
                <option value="income">Receita</option>
              </select>
            </div>

            <div className={cn('__transaction-modal-body-div')}>
              <div className={cn('__transaction-modal-body-input')}>
                <label htmlFor="amount">Valor</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <div
                className={cn('__transaction-modal-body-input', '__transaction-modal-body-select')}
              >
                <label htmlFor="category">Categoria</label>
                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                  <option value="all">Selecione</option>
                  <option value="alimentacao">Alimentação</option>
                  <option value="educacao">Educação</option>
                  <option value="lazer">Lazer</option>
                  <option value="moradia">Moradia</option>
                  <option value="saude">Saúde</option>
                  <option value="transporte">Transporte</option>
                  <option value="trabalho">Trabalho</option>
                </select>
              </div>
            </div>
            <div className={cn('__transaction-modal-body-buttons')}>
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

export default TransactionModal;
