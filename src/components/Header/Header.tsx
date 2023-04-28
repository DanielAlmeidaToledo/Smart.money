import cn from 'classnames';

import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

import './Header.scss';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div className={cn('__header-container', className)}>
      <ThemeSwitcher />
      <span className="material-symbols-outlined">notifications_active</span>
      <div className="__header-user">
        <div className="__header-iconUser"></div>
        <p>User</p>
      </div>
    </div>
  );
};

export default Header;
