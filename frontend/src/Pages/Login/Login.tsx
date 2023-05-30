import cn from 'classnames';
import { useState } from 'react';
import useAuthContext from '../../contexts/AuthContext';

import './Login.scss';
import Logo from '../../assets/logo/logo-verde-esc.svg';
import GoogleIcon from '../../assets/icons/icon-google.svg';

import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';

type LoginProps = {
  className?: string;
};

const Login: React.FC<LoginProps> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errors } = useAuthContext();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className={cn('__login-container', className)}>
      <div className={cn('__login-header')}>
        <ThemeSwitcher />
      </div>
      <div className={cn('__login-content')}>
        <div className={cn('__login-logo')}>
          <img src={Logo} alt="Logo da Smart.money" />
          <h3>
            Controle suas finanças com eficiência através da <span>Smart.money</span>
          </h3>
        </div>
        <div className={cn('__login-form')}>
          <form action="">
            <p className={cn('__login-form-title')}>Acesse sua conta</p>
            <button className={cn('__login-form-google')}>
              <img src={GoogleIcon} alt="Logo do Google" />
              Entre com o Google
            </button>
            <div className={cn('__login-form-or')}>
              <hr />
              <span>ou</span>
              <hr />
            </div>
            <div className={cn('__login-form-input')}>
              <label htmlFor="">Seu e-mail</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={cn('__login-form-input')}>
              <label htmlFor="">Sua senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>Esqueci minha senha</p>
            </div>
            <button className={cn('__login-form-button')} onClick={handleLogin}>
              Entrar
            </button>
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