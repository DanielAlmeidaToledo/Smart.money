import cn from 'classnames';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import useAuthContext from '../../contexts/AuthContext';

import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

import './Header.scss';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={cn('__header-container', className)}>
      <ThemeSwitcher />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <span className="material-symbols-outlined">account_circle</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="__dropdown-content">
          <DropdownMenu.Item className="__dropdown-item">
            <a href="/ajustes">
              <span className="material-symbols-outlined">settings</span>
              <span>Ajustes</span>
            </a>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="__dropdown-item" onSelect={handleLogout}>
            <div>
              <span className="material-symbols-outlined">logout</span>
              <span>Sair</span>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Header;
