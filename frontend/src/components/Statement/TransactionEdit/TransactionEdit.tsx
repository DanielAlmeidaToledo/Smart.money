import cn from 'classnames';
import { useState } from 'react';
import axios from '../../../api/axios';
import useAuthContext from '../../../contexts/AuthContext';

import './TransactionEdit.scss';

type TransactionEditProps = {
  className?: string;
  selectedTransaction: any;
  onClose: () => void;
  searchTransactions: () => void;
};

const TransactionEdit: React.FC<TransactionEditProps> = ({
  className,
  onClose,
  searchTransactions,
  selectedTransaction
}) => {
  const [title, setTitle] = useState(selectedTransaction.title);
  const [type, setType] = useState(selectedTransaction.type);
  const [amount, setAmount] = useState(selectedTransaction.amount);
  const [category, setCategory] = useState(selectedTransaction.category);
  const { user } = useAuthContext();

  const handleUpdate = () => {
    axios
      .patch(`/transactions/${selectedTransaction.id}`, {
        title,
        type,
        amount,
        category
      })
      .then((response) => {
        onClose();
        searchTransactions();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/transactions/${selectedTransaction.id}`)
      .then((response) => {
        onClose();
        searchTransactions();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={cn('__transaction-edit-container', className)}>
      <div className={cn('__transaction-edit-content')}>
        <div className={cn('__transaction-edit-header')}>
          <h2>Editar transação</h2>
          <button className={cn(className, 'button-close', 'Button')} onClick={onClose}>
            x
          </button>
        </div>
        <div className={cn('__transaction-edit-body')}>
          <div className={cn('__transaction-edit-body-input')}>
            <label htmlFor="title">Nome</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={cn('__transaction-edit-body-input', '__transaction-edit-body-select')}>
            <label htmlFor="type">Tipo</label>
            <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">Selecione</option>
              <option value="expense">Gasto</option>
              <option value="income">Receita</option>
            </select>
          </div>

          <div className={cn('__transaction-edit-body-div')}>
            <div className={cn('__transaction-edit-body-input')}>
              <label htmlFor="amount">Valor</label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className={cn('__transaction-edit-body-input', '__transaction-edit-body-select')}>
              <label htmlFor="category">Categoria</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">Selecione</option>
                <option value="alimentacao">Alimentação</option>
                <option value="saude">Saúde</option>
                <option value="transporte">Transporte</option>
                <option value="compras">Compras</option>
                <option value="salario">Salário</option>
                <option value="geral">Outros</option>
              </select>
            </div>
          </div>
          <div className={cn('__transaction-edit-body-buttons')}>
            <button className={cn(className, 'button-delete')} onClick={handleDelete}>
              Excluir
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

export default TransactionEdit;
