import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './../api/axios';

type AuthProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
  };
  errors: any[];
  setErrors: (errors: any[]) => void;
  getUser: (userId: string) => Promise<void>;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    created_at: ''
  });
  const [errors, setErrors] = useState<any[]>([]);

  const navigate = useNavigate();

  const getUser = async (userId: string) => {
    try {
      const { data } = await axios.get(`/users/${userId}`);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async ({ ...data }) => {
    try {
      const response = await axios.post('/login', data);
      const { id, name, email, created_at } = response.data;
      setUser({ id, name, email, created_at });
      setErrors([]);
      navigate('/dashboard');
    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors.error);
      }
    }
  };

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

  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser({
        id: '',
        name: '',
        email: '',
        created_at: ''
      });
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, errors, setErrors, getUser, login, register }}>
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
