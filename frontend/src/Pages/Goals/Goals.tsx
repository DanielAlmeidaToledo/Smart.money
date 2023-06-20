import { useState, useEffect } from 'react';
import cn from 'classnames';
import axios from '../../api/axios';
import useAuthContext from '../../contexts/AuthContext';

import GoalModal from '../../components/Goals/GoalModal/GoalModal';
import GoalAddSaldo from '../../components/Goals/GoalAddSaldo/GoalAddSaldo';

import './Goals.scss';

type GoalsProps = {
  className?: string;
};

import SearchIcon from '../../assets/icons/search-icon.svg';
import TripIcon from '../../assets/goals/trip.svg';
import HouseIcon from '../../assets/goals/house.svg';
import CarIcon from '../../assets/goals/car.svg';
import SaveMoneyIcon from '../../assets/goals/save-money.svg';

const types = [
  { id: 1, name: 'VIAGEM', icon: TripIcon },
  { id: 2, name: 'COMPRA', icon: TripIcon },
  { id: 3, name: 'CASA', icon: HouseIcon },
  { id: 4, name: 'CARRO', icon: CarIcon },
  { id: 5, name: 'ECONOMIA', icon: SaveMoneyIcon },
  { id: 6, name: 'OUTROS', icon: SaveMoneyIcon }
];

const Goals: React.FC<GoalsProps> = ({ className }) => {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenAddSaldo, setIsOpenAddSaldo] = useState(false);
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

  // Modal de adicionar meta
  const openAddModal = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const closeAddModal = () => {
    setIsOpenAdd(false);
  };

  // Modal de adicionar saldo
  const openAddSaldoModal = async (goal: any) => {
    await setSelectedGoal(goal);
    setIsOpenAddSaldo(!isOpenAddSaldo);
  };

  const closeAddSaldoModal = () => {
    setIsOpenAddSaldo(false);
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
          <button className={cn(className, 'button-add-goal', 'Button')} onClick={openAddModal}>
            Adicionar
          </button>
          {isOpenAdd && (
            <GoalModal
              onClose={closeAddModal}
              searchGoals={searchGoals}
              className={cn(className, '__transaction-modal')}
            />
          )}
        </div>
        <div className={cn('__goals-table')}>
          {goals.length === 0 ? (
            <div className={cn('__goals-empty')}>
              <h3>Nenhuma meta encontrada :(</h3>
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
                        {types.map((typeItem) => {
                          if (typeItem.name === type) {
                            return (
                              <img
                                className="icon-table"
                                key={typeItem.id}
                                src={typeItem.icon}
                                alt={typeItem.name}
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
                        <button
                          className="button-add-balance"
                          onClick={() => openAddSaldoModal(goal)}
                        >
                          Adicionar saldo
                        </button>
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
      {isOpenAddSaldo && (
        <GoalAddSaldo
          onClose={closeAddSaldoModal}
          searchGoals={searchGoals}
          selectedGoal={selectedGoal}
          className={cn(className, 'goal-modal')}
        />
      )}
    </div>
  );
};

export default Goals;
