import { useState, useEffect } from 'react';
import cn from 'classnames';
import axios from '../../api/axios';
import useAuthContext from '../../contexts/AuthContext';
import { TransactionProps } from '../../contexts/Props';
import TransactionModal from '../../components/Statement/TransactionModal/TransactionModal';
import TransactionEdit from '../../components/Statement/TransactionEdit/TransactionEdit';

import './Statement.scss';

import CardIcon from '../../assets/icons/card-icon.svg';
import FoodIcon from '../../assets/icons/food-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import SalaryIcon from '../../assets/icons/salary-icon.svg';
import ClothesIcon from '../../assets/icons/clothing-icon.svg';
import GeralIcon from '../../assets/icons/finance-icon.svg';
import HealthIcon from '../../assets/icons/health-icon.svg';
import CarIcon from '../../assets/icons/car-icon.svg';

const categories = [
  { id: 1, name: 'all', icon: GeralIcon, color: '#A6A6A6' },
  { id: 2, name: 'geral', icon: GeralIcon, color: '#008080' },
  { id: 3, name: 'alimentacao', icon: FoodIcon, color: '#1CA477' },
  { id: 5, name: 'saude', icon: HealthIcon, color: '#4DFFFF' },
  { id: 6, name: 'transporte', icon: CarIcon, color: '#000000' },
  { id: 7, name: 'compras', icon: ClothesIcon, color: '#FF4D79' },
  { id: 8, name: 'salario', icon: SalaryIcon, color: '#71199A' }
];

type StatementProps = {
  className?: string;
};

const Statement: React.FC<StatementProps> = ({ className }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [transactions, setTransactions] = useState<TransactionProps>([]);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    searchTransactions();
  }, [user?.id]);

  // Realiza a busca das transações do usuário
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

  // Modal de adicionar transação
  const openAddModal = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const closeAddModal = () => {
    setIsOpenAdd(false);
  };

  // Modal de editar transação
  const openEditModal = async (transaction: any) => {
    await setSelectedTransaction(transaction);
    setIsOpenEdit(!isOpenEdit);
  };

  const closeEditModal = () => {
    setIsOpenEdit(false);
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
            {/* <div>
              <img src={CardIcon} alt="Filtrar" />
              <select name="type" id="type">
                <option value="all">Selecione</option>
                <option value="inter">Inter</option>
                <option value="nubank">Nubank</option>
                <option value="itau">Itaú</option>
                <option value="bradesco">Bradesco</option>
              </select>
            </div> */}
          </div>
          <button
            className={cn(className, 'button-add-transaction', 'Button')}
            onClick={openAddModal}
          >
            Adicionar
          </button>
          {isOpenAdd && (
            <TransactionModal
              onClose={closeAddModal}
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
                        <button
                          className="button-detail"
                          onClick={() => openEditModal(transaction)}
                        >
                          Editar
                        </button>
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
      {isOpenEdit && (
        <TransactionEdit
          onClose={closeEditModal}
          searchTransactions={searchTransactions}
          selectedTransaction={selectedTransaction}
          className={cn(className, '__transaction-edit')}
        />
      )}
    </div>
  );
};

export default Statement;