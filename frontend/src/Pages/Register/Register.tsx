import cn from 'classnames';

import './Register.scss';
import Logo from '../../assets/logo/logo-verde-esc.svg';
import GoogleIcon from '../../assets/icons/icon-google.svg';

import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';

type RegisterProps = {
  className?: string;
};

const Register: React.FC<RegisterProps> = ({ className }) => {
  return (
    <div className={cn('__register-container', className)}>
      {/* Header */}
      <div className={cn('__register-header')}>
        <ThemeSwitcher />
      </div>
      {/* Content */}
      <div className={cn('__register-content')}>
        {/* Logo e Texto */}
        <div className={cn('__register-logo')}>
          <img src={Logo} alt="Logo da Smart.money" />
          <h3>
            Controle suas finanças com eficiência através da <span>Smart.money</span>
          </h3>
        </div>
        {/* Formulário*/}
        <div className={cn('__register-form')}>
          <form action="">
            <p className={cn('__register-form-title')}>Crie sua conta como quiser</p>
            <p className={cn('__register-form-subtitle')}>Comece já a organizar sua grana</p>
            {/* Botão Google */}
            <button className={cn('__register-form-google')}>
              <img src={GoogleIcon} alt="Logo do Google" />
              Registre-se com o Google
            </button>
            {/* Ou */}
            <div className={cn('__register-form-or')}>
              <hr />
              <span>ou</span>
              <hr />
            </div>
            {/* Inputs */}
            <div className={cn('__register-form-input')}>
              <label htmlFor="">Seu nome</label>
              <input type="text" />
            </div>
            <div className={cn('__register-form-input')}>
              <label htmlFor="">Seu e-mail</label>
              <input type="email" />
            </div>
            <div className={cn('__register-form-input')}>
              <label htmlFor="">Sua senha</label>
              <input type="password" />
            </div>
            {/* Botão Enviar */}
            <a href="/inicio" className={cn('__register-form-button')}>
              Começar a usar
            </a>
          </form>
          <p className={cn('__register-cadastro')}>
            Já sou cadastrado. <a href="/login">Quero fazer login!</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
