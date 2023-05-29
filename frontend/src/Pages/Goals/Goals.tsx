import cn from 'classnames';

import './Goals.scss';

type GoalsProps = {
  className?: string;
};

import SearchIcon from '../../assets/icons/search-icon.svg';
import TripIcon from '../../assets/goals/trip.svg';
import HouseIcon from '../../assets/goals/house.svg';
import CarIcon from '../../assets/goals/car.svg';
import SaveMoneyIcon from '../../assets/goals/save-money.svg';

const categories = [
  { id: 1, name: 'viagem', icon: TripIcon },
  { id: 2, name: 'compra', icon: TripIcon },
  { id: 3, name: 'casa', icon: HouseIcon },
  { id: 4, name: 'carro', icon: CarIcon },
  { id: 4, name: 'economia', icon: SaveMoneyIcon }
];

const goals = [
  {
    id: 1,
    title: 'Viagem para o Caribe',
    type: 'viagem',
    amount: 20000,
    balance: 14600
  },
  {
    id: 2,
    title: 'Corte de gastos',
    type: 'economia',
    amount: 8000,
    balance: 2000
  },
  {
    id: 3,
    title: 'Casa em condomínio',
    type: 'casa',
    amount: 1000000,
    balance: 920000
  },
  {
    id: 4,
    title: 'Comprar Audi A3',
    type: 'carro',
    amount: 100000,
    balance: 42000
  }
];

const Goals: React.FC<GoalsProps> = ({ className }) => {
  return (
    <div className={cn('__goals-container', className)}>
      <h2>Metas</h2>
      <div className={cn('__goals-content')}>
        <div className={cn('__goals-search')}>
          <div>
            <img src={SearchIcon} alt="Pesquisar" />
            <input type="text" placeholder="Pesquisar" />
          </div>
        </div>
        <div className={cn('__goals-table')}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Progresso</th>
                <th>Saldo</th>
                <th>Visualizar</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => {
                const { id, title, type, amount, balance } = goal;
                return (
                  <tr key={id}>
                    <td className="td-name">
                      {categories.map((categoryItem) => {
                        if (categoryItem.name === type) {
                          return (
                            <img
                              className="icon-table"
                              key={categoryItem.id}
                              src={categoryItem.icon}
                              alt={categoryItem.name}
                            />
                          );
                        }
                      })}
                      {title}
                    </td>
                    <td>
                      <div className="td-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${(balance / amount) * 100}%` }}
                          ></div>
                        </div>
                        <span className="progress-bar-text">{(balance / amount) * 100}%</span>
                      </div>
                    </td>
                    <td>
                      <button className="button-add-balance">Adicionar saldo</button>
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

export default Goals;
