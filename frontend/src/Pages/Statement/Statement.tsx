import { useState, useEffect } from 'react';
import cn from 'classnames';
import axios from '../../api/axios';
import useAuthContext from '../../contexts/AuthContext';
import { TransactionProps } from '../../contexts/Props';
import TransactionModal from '../../components/Statement/TransactionModal/TransactionModal';

import './Statement.scss';

import CarIcon from '../../assets/icons/car-icon.svg';
import CardIcon from '../../assets/icons/card-icon.svg';
import FoodIcon from '../../assets/icons/food-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import SalaryIcon from '../../assets/icons/salary-icon.svg';
import ClothesIcon from '../../assets/icons/clothing-icon.svg';

type StatementProps = {
  className?: string;
};

const categories = [
  { id: 1, name: 'all', icon: FoodIcon, color: '#71199A' },
  { id: 2, name: 'alimentacao', icon: FoodIcon, color: '#1CA477' },
  { id: 3, name: 'educacao', icon: ClothesIcon, color: '#19359A' },
  { id: 4, name: 'lazer', icon: CarIcon, color: '#8B4C1F' },
  { id: 5, name: 'moradia', icon: FoodIcon, color: '#71199A' },
  { id: 6, name: 'saude', icon: FoodIcon, color: '#71199A' },
  { id: 7, name: 'transporte', icon: FoodIcon, color: '#71199A' },
  { id: 8, name: 'compras', icon: ClothesIcon, color: '#71199A' }
];

const Statement: React.FC<StatementProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionProps>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    searchTransactions();
  }, [user?.id]);

  const searchTransactions = () => {
    axios
      .get(`/transactions/user/${user.id}`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={cn('__statement-container', className)}>
      <h2>Extrato</h2>
      <div className={cn('__statement-content')}>
        <div className={cn('__statement-search')}>
          <div>
            <div>
              <img src={SearchIcon} alt="Pesquisar" />
              <input type="text" placeholder="Pesquisar" />
            </div>
            <div>
              <img src={CardIcon} alt="Filtrar" />
              <select name="type" id="type">
                <option value="all">Selecione</option>
                <option value="inter">Inter</option>
                <option value="nubank">Nubank</option>
                <option value="itau">Itaú</option>
                <option value="bradesco">Bradesco</option>
              </select>
            </div>
          </div>
          <button className={cn(className, 'button-add-transaction', 'Button')} onClick={openModal}>
            Adicionar
          </button>
          {isOpen && (
            <TransactionModal
              onClose={closeModal}
              searchTransactions={searchTransactions}
              className={cn(className, '__transaction-modal')}
            />
          )}
        </div>
        <div className={cn('__statement-table')}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions ? (
                transactions.map((transaction) => {
                  const { id, title, type, category, amount, created_at } = transaction;
                  return (
                    <tr key={id}>
                      <td className="td-name">
                        {categories.map((categoryItem) => {
                          if (categoryItem.name === category) {
                            return (
                              <img
                                className="icon-table"
                                key={categoryItem.id}
                                src={categoryItem.icon}
                                alt={categoryItem.name}
                                style={{ backgroundColor: categoryItem.color }}
                              />
                            );
                          }
                          return null;
                        })}
                        {title}
                      </td>
                      <td
                        className={cn(type)}
                        style={{ color: type === 'income' ? '#1CA477' : '#E22525' }}
                      >
                        {type === 'income' ? '+ ' : '- '}
                        {amount.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </td>
                      <td>{created_at.toString()}</td>
                      <td>
                        <button className="button-detail">Detalhes</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="td-empty">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statement;
