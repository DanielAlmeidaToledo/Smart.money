import cn from 'classnames';
import useAuthContext from '../../contexts/AuthContext';
import { useState } from 'react';
import axios from '../../api/axios';
import Alert from '@mui/material/Alert';

import './Settings.scss';

type SettingsProps = {
  className?: string;
};

const Settings: React.FC<SettingsProps> = ({ className }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const { user, logout } = useAuthContext();

  // Salva os dados do usuário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.patch('/users', {
        name: name,
        email: email,
        password: password
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Exclui a conta do usuário
  const handleDelete = async () => {
    try {
      console.log('deletando');
      const response = await axios.delete(`/users/${user?.id}`);
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn('__settings-container', className)}>
      <h2>Ajustes</h2>
      <form onSubmit={handleSubmit}>
        <div className="__settings-container_form_input">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            minLength={2}
            defaultValue={user && user.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="__settings-container_form_input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={user && user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="__settings-container_form_input">
          <label htmlFor="password">Nova Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassowrd(e.target.value)}
          />
        </div>
        <div className="__settings-container_form_buttons">
          <button type="button" className="button-delete" onClick={handleDelete}>
            Excluir Conta
          </button>
          <div>
            <button type="button" className="button-cancel">
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
