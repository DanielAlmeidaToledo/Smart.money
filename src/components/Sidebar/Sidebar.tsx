import { Link, useLocation, matchPath } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import Logo from '../../assets/logo/logo-verde-esc.svg'

import './Sidebar.scss';

const sidebarItems = [
  { route: '/inicio', label: 'Início', icon: 'home' },
  { route: '/extrato', label: 'Extrato', icon: 'receipt_long' },
  { route: '/cartoes', label: 'Cartões', icon: 'style' },
  { route: '/metas', label: 'Metas', icon: 'track_changes' },
  { route: '/ajustes', label: 'Ajustes', icon: 'settings' }
];

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  function toggleOpen() {
    setOpen((e) => !e);
  }

  return (
    <div className={cn('__sidebar-container', className, { open })}>
      <div className="divLogo">
        <img src={Logo} alt="Logo Smart.money" />
      </div>
      <div className="btnSidebar">
        <button onClick={() => toggleOpen()}>
          <span className="material-symbols-outlined" id="iconHandle">
            {open ? 'navigate_before' : 'navigate_next'}
          </span>
        </button>
      </div>
      <nav className="nav">
        <ul>
          {sidebarItems.map((item) => {
            const { route, label, icon } = item;
            return (
              <li key={route}>
                <Link
                  to={route}
                  className={cn('link', {
                    active: matchPath(
                      route === '/' ? `/` : `${route}/*`,
                      location.pathname
                    )
                  })}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                  <p className={cn({ open })}>{label}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
