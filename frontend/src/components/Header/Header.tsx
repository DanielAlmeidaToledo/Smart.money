import cn from 'classnames';

import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

import './Header.scss';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  function handleButton(){
    alert("Em desenvolvimento");
  }
  return (
    <div className={cn('__header-container', className)}>
      <ThemeSwitcher />
      <button onClick={() => handleButton()}>
        <span className="material-symbols-outlined">settings</span>
      </button>
      <button onClick={() => handleButton()}>
        <span className="material-symbols-outlined">account_circle</span>
      </button>
    </div>
  );
};

export default Header;
