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
        <ThemeSwitcher />
      </div>{' '}
      <div className={cn('__landing-page-title')}>
        <img src={Logo} alt="Logo" />
      </div>
      <div className={cn('__landing-page-btn')}>
        <a href="/login">Entrar</a>
        <a href="/cadastro">Registrar-se</a>
      </div>
    </div>
  );
};

export default LandingPage;