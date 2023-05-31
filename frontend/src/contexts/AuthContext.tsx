import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';

type AuthProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: any;
  errors: any[];
  getUser: () => Promise<void>;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState(null);
  const [errors, setErros] = useState<any[]>([]);

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
      redirect('/123');
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
      redirect('/opa');
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

export default function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
