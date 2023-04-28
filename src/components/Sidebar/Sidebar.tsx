import { Link, useLocation, matchPath } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';

import './Sidebar.scss';

const sidebarItems = [
  { route: '/', label: 'Dashboard', icon: 'dashboard' },
  { route: '/comercios', label: 'Comércios', icon: 'store' },
  { route: '/inquilinos', label: 'Inquilinos', icon: 'apartment' },
  { route: '/usuarios', label: 'Usuários', icon: 'group' }
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
      <div className="btnSidebar">
        <button onClick={() => toggleOpen()}>
          <span className="material-symbols-outlined">
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
