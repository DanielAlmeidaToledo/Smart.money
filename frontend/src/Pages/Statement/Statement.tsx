import cn from 'classnames';
import { useState } from 'react';

import './Statement.scss';

import SearchIcon from '../../assets/icons/search-icon.svg';
import CardIcon from '../../assets/icons/card-icon.svg';
import FoodIcon from '../../assets/icons/food-icon.svg';
import SalaryIcon from '../../assets/icons/salary-icon.svg';
import ClothesIcon from '../../assets/icons/clothing-icon.svg';
import CarIcon from '../../assets/icons/car-icon.svg';

import TransactionModal from '../../components/Statement/TransactionModal/TransactionModal';
import { useTransactions } from '../../components/useOutletContext/useOutletContext';

type StatementProps = {
  className?: string;
};

const categories = [
  { id: 1, name: 'comida', icon: FoodIcon, color: '#71199A' },
  { id: 2, name: 'salario', icon: SalaryIcon, color: '#1CA477' },
  { id: 3, name: 'roupas', icon: ClothesIcon, color: '#19359A' },
  { id: 4, name: 'carro', icon: CarIcon, color: '#8B4C1F' },
  { id: 5, name: 'lazer', icon: FoodIcon, color: '#71199A' },
  { id: 6, name: 'transporte', icon: FoodIcon, color: '#71199A' },
  { id: 7, name: 'saude', icon: FoodIcon, color: '#71199A' },
  { id: 8, name: 'educacao', icon: FoodIcon, color: '#71199A' },
  { id: 9, name: 'outros', icon: FoodIcon, color: '#71199A' }
];

const Statement: React.FC<StatementProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { transactions } = useTransactions();
  console.log(transactions?.length);

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
                transactions?.map((transaction) => {
                  const { id, title, type, category, amount, date } = transaction;
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
                        })}
                        {title}
                      </td>
                      <td
                        className={cn(type)}
                        style={{ color: type === 'receita' ? '#1CA477' : '#E22525' }}
                      >
                        {type === 'receita' ? '+ ' : '- '}
                        {amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td>
                        {date.toLocaleDateString('pt', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit'
                        })}
                      </td>
                      <td>
                        <button className="button-detail">Detalhes</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="td-empty">
                    Nenhuma transação encontrada
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
