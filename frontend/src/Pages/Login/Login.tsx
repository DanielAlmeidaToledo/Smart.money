import cn from 'classnames';

import './Login.scss'
import Logo from '../../assets/logo/logo-verde-esc.svg'
import GoogleIcon from '../../assets/icons/icon-google.svg'

import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';

type LoginProps = {
  className?: string;
};

const Login: React.FC<LoginProps> = ({ className }) => {
  return (
    <div className={cn('__login-container', className)}>
      {/* Header */}
      <div className={cn('__login-header')}>
        <ThemeSwitcher />
      </div>
      {/* Content */}
      <div className={cn('__login-content')}>
        {/* Logo e Texto */}
        <div className={cn('__login-logo')}>
          <img src={Logo} alt="Logo da Smart.money" />
          <h3>
            Controle suas finanças com eficiência através da <span>Smart.money</span>
          </h3>
        </div>
        {/* Formulário*/}
        <div className={cn('__login-form')}>
          <form action="">
            <p className={cn('__login-form-title')}>Acesse sua conta</p>
            {/* Botão Google */}
            <button className={cn('__login-form-google')}>
              <img src={GoogleIcon} alt="Logo do Google" />
              Entre com o Google
            </button>
            {/* Ou */}
            <div className={cn('__login-form-or')}>
              <hr />
              <span>ou</span>
              <hr />
            </div>
            {/* Inputs */}
            <div className={cn('__login-form-input')}>
              <label htmlFor="">Seu e-mail</label>
              <input type="text" />
            </div>
            <div className={cn('__login-form-input')}>
              <label htmlFor="">Sua senha</label>
              <input type="password" />
              <p>Esqueci minha senha</p>
            </div>
            {/* Botão Enviar */}
            <a href="/inicio" className={cn('__login-form-button')}>
              Entrar
            </a>
          </form>
          <p className={cn('__login-cadastro')}>
            Ainda não possui conta? <a href="/cadastro">Faça o cadastro!</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;