import cn from 'classnames';

import './LandingPage.scss'
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';

type LandingPageProps = {
  className?: string;
};

const LandingPage: React.FC<LandingPageProps> = ({ className }) => {
  return (
    <div className={cn('__landing-page', className)}>
      <div>
        <h1>Smart.money</h1>
        <ThemeSwitcher />
      </div>
      <a href="/login">Entrar</a>
      <a href="/registro">Registrar-se</a>
      <a href="/dashboard">Dashboard</a>
    </div>
  );
};

export default LandingPage;