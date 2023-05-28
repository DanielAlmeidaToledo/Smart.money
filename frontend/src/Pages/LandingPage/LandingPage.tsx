import cn from 'classnames';

import './LandingPage.scss'
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import Logo from '../../assets/logo/logo-verde-esc.svg';

type LandingPageProps = {
  className?: string;
};

const LandingPage: React.FC<LandingPageProps> = ({ className }) => {
  return (
    <div className={cn('__landing-page', className)}>
      <div className={cn('__landing-page-header')}>
        <img src={Logo} alt="Logo" />
        <div className={cn('__landing-page-btn')}>
          <a href="/login">Entrar</a>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;