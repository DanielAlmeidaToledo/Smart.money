import { useState } from 'react';
import cn from 'classnames';
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
    await login({
      email: email,
      password: password
    });
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
          <form onSubmit={handleLogin}>
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
              <label>Seu e-mail</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={cn('__login-form-input')}>
              <label>Sua senha</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p>Esqueci minha senha</p>
            </div>
            {errors && (
              <div className={cn('__login-form-errors')}>
                {errors.map((error: any, index: number) => (
                  <span key={index}>{error}</span>
                ))}
              </div>
            )}

            <button className={cn('__login-form-button')} type="submit">
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
