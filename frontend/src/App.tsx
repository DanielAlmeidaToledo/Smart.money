import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

import './styles/main.scss';

import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import useAuthContext from './contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';


function App() {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    if (!cookies.get('user')) {
      navigate('/');
      setUser({
        id: '',
        name: '',
        email: '',
        created_at: ''
      });
    }
  }, [user, navigate]);

  return (
    <div className="__content-and-sidebar-wrapper">
      <Sidebar />
      <div className="__app-content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
