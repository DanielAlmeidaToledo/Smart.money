import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import Paper from '../../components/Paper/Paper';
import PaperContent from '../../components/Paper/PaperContent';
import PaperMenu from '../../components/Paper/PaperMenu';
import PaperMenuItem from '../../components/Paper/PaperMenuItem';

import './Merchant.scss';

type MerchantProps = {
  className?: string;
};

// Objeto com as rotas do PaperMenu
const routes = [
  { title: 'Geral', route: '' },
  { title: 'Endereço', route: 'endereco' },
  { title: 'Contato', route: 'contato' },
  { title: 'Horário de Funcionamento', route: 'horario-funcionamento' }
];

const Merchant: React.FC<MerchantProps> = ({ className }) => {
  // Location - React Router
  const location = useLocation();

  return (
    <div className={cn('__merchant-container', className)}>
      <Paper>
        <PaperContent>
          <Outlet />
        </PaperContent>
        <PaperMenu>
          {routes.map((item) => {
            const { title, route } = item;
            return (
              <PaperMenuItem
                key={title}
                route={route}
                className={cn({
                  selected:
                    (route === '' && location.pathname === '/comercios') ||
                    location.pathname.split('/')[2] === route
                })}
              >
                {title}
              </PaperMenuItem>
            );
          })}
        </PaperMenu>
      </Paper>
    </div>
  );
};

export default Merchant;
