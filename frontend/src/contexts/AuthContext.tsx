import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from './../api/axios';

type AuthProps = {
  children: React.ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type AuthContextType = {
  user: User;
  errors: any[];
  setErrors: (errors: any[]) => void;
  setUser: (user: User) => void;
  register: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const cookies = new Cookies();

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    created_at: ''
  });
  const [errors, setErrors] = useState<any[]>([]);
  const navigate = useNavigate();

  // Verifica se o usuário está logado
  useEffect(() => {
    const userCookie = cookies.get('user');
    if (userCookie) {
      setUser(userCookie);
    }
  }, []); 

  // Função para fazer login
  const login = async ({ ...data }) => {
    try {
      const response = await axios.post('/login', data);
      const { id, name, email, created_at } = response.data;
      setUser({ id, name, email, created_at });
      setErrors([]);
      cookies.set('user', { id, name, email, created_at });
      navigate('/dashboard');
    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors.error);
      }
    }
  };

  // Função para fazer cadastro
  const register = async ({ ...data }) => {
    try {
      const response = await axios.post('/users', data);
      setUser(response.data.data);
      navigate('/dashboard');
    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
      setErrors([]);
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser({
        id: '',
        name: '',
        email: '',
        created_at: ''
      });
      cookies.remove('user');
      setErrors([]);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, errors, setErrors, setUser, register, login, logout }}>
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
