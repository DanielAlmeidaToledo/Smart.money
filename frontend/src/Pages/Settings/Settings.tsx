import cn from 'classnames';
import useAuthContext from '../../contexts/AuthContext';
import axios from '../../api/axios';

import './Settings.scss';

type SettingsProps = {
  className?: string;
};

const Settings: React.FC<SettingsProps> = ({ className }) => {
  const { user } = useAuthContext();

  console.log(user);

  return (
    <div className={cn('__settings-container', className)}>
      <h2>Ajustes</h2>
      <form>
        <div className="__settings-container_form_input">
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="name" defaultValue={user && user.name} />
        </div>
        <div className="__settings-container_form_input">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" defaultValue={user && user.email} />
        </div>
        <div className="__settings-container_form_input">
          <label htmlFor="password">Nova Senha</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="__settings-container_form_buttons">
          <button type="button" className="button-cancel">
            Cancelar
          </button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
