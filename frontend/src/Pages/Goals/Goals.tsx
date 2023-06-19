import { useState, useEffect } from 'react';
import cn from 'classnames';
import axios from '../../api/axios';
import useAuthContext from '../../contexts/AuthContext';

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
  { id: 1, name: 'VIAGEM', icon: TripIcon },
  { id: 2, name: 'compra', icon: TripIcon },
  { id: 3, name: 'casa', icon: HouseIcon },
  { id: 4, name: 'CARRO', icon: CarIcon },
  { id: 5, name: 'economia', icon: SaveMoneyIcon },
  { id: 6, name: 'outros', icon: SaveMoneyIcon }
];

const Goals: React.FC<GoalsProps> = ({ className }) => {
  const [goals, setGoals] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    searchGoals();
  }, [user?.id]);

  // Realiza a busca das metas do usuário
  const searchGoals = () => {
    if (user?.id) {
      axios
        .get(`/goals/user/${user.id}`)
        .then((response) => {
          setGoals(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={cn('__goals-container', className)}>
      <h2>Metas</h2>
      <div className={cn('__goals-content')}>
        <div className={cn('__goals-search')}>
          <div>
            <img src={SearchIcon} alt="Pesquisar" />
            <input type="text" placeholder="Pesquisar" />
          </div>
          <button className={cn(className, 'button-add-goal', 'Button')}>Adicionar</button>
        </div>
        <div className={cn('__goals-table')}>
          {goals.length === 0 ? (
            <div className={cn('__goals-empty')}>
              <h3>Nenhuma meta cadastrada :(</h3>
            </div>
          ) : (
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
                          <span className="progress-bar-text">
                            {((balance / amount) * 100).toFixed(0)}%
                          </span>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;
