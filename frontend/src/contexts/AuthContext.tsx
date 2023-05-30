import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [errors, setErros] = useState([]);
  const navigate = useNavigate();

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const getUser = async () => {
    const { data } = await axios.get('/api/user');
    setUser(data);
  };

  const login = async ({ ...data }) => {
    await csrf();
    try {
      await axios.post('/login', data);
      getUser();
      navigate('/');
    } catch (e: any) {
      if (e.response.status === 422) {
        setErros(e.response.data.errors);
      }
    }
  };

  const register = async ({ ...data }) => {
    await csrf();
    try {
      await axios.post('/register', data);
      getUser();
      navigate('/');
    } catch (e: any) {
      if (e.response.status === 422) {
        setErros(e.response.data.errors);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, errors, getUser, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
