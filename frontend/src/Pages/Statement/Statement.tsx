import cn from 'classnames';

import './Statement.scss';

type StatementProps = {
  className?: string;
};

import SearchIcon from '../../assets/icons/search-icon.svg';
import CardIcon from '../../assets/icons/card-icon.svg';
import FoodIcon from '../../assets/icons/food-icon.svg';
import SalaryIcon from '../../assets/icons/salary-icon.svg';
import ClothesIcon from '../../assets/icons/clothing-icon.svg';
import CarIcon from '../../assets/icons/car-icon.svg';

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

const transactions = [
  {
    id: 1,
    title: 'Almoço - Restaurante',
    type: 'gasto',
    category: 'comida',
    amount: 350,
    date: new Date('2023-01-05 12:00:00')
  },
  {
    id: 2,
    title: 'Salário',
    type: 'receita',
    category: 'salario',
    amount: 1500.0,
    date: new Date('2023-05-05 17:00:00')
  },
  {
    id: 3,
    title: 'Compras no shopping',
    type: 'gasto',
    category: 'roupas',
    amount: 589.9,
    date: new Date('2023-07-05 14:00:00')
  },
  {
    id: 4,
    title: 'Posto de combustível',
    type: 'gasto',
    category: 'carro',
    amount: 940.0,
    date: new Date('2023-10-05 07:40:00')
  }
];

const Statement: React.FC<StatementProps> = ({ className }) => {
  return (
    <div className={cn('__statement-container', className)}>
      <h2>Extrato</h2>
      <div className={cn('__statement-content')}>
        <div className={cn('__statement-search')}>
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
              {transactions.map((transaction) => {
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statement;
