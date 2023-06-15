import { useState } from 'react';
import cn from 'classnames';
import useAuthContext from '../../contexts/AuthContext';

import './Register.scss';

import Logo from '../../assets/logo/logo-verde-esc.svg';
import GoogleIcon from '../../assets/icons/icon-google.svg';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';

type RegisterProps = {
  className?: string;
};

const Register: React.FC<RegisterProps> = ({ className }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, errors, user } = useAuthContext();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    await register({
      name: name,
      email: email,
      password: password
    });
  };

  return (
    <div className={cn('__register-container', className)}>
      <div className={cn('__register-header')}>
        <ThemeSwitcher />
      </div>
      <div className={cn('__register-content')}>
        <div className={cn('__register-logo')}>
          <img src={Logo} alt="Logo da Smart.money" />
          <h3>
            Controle suas finanças com eficiência através da <span>Smart.money</span>
          </h3>
        </div>
        <div className={cn('__register-form')}>
          <form onSubmit={handleRegister}>
            <p className={cn('__register-form-title')}>Crie sua conta como quiser</p>
            <p className={cn('__register-form-subtitle')}>Comece já a organizar sua grana</p>
            <button className={cn('__register-form-google')}>
              <img src={GoogleIcon} alt="Logo do Google" />
              Registre-se com o Google
            </button>
            <div className={cn('__register-form-or')}>
              <hr />
              <span>ou</span>
              <hr />
            </div>
            <div className={cn('__register-form-input')}>
              <label>Seu nome</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={cn('__register-form-input')}>
              <label>Seu e-mail</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={cn('__register-form-input')}>
              <label>Sua senha</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={cn('__register-form-button')}>Começar a usar</button>
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
