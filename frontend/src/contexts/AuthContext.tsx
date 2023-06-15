import { createContext, useContext, useState } from 'react';
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
      window.location.href = '/dashboard';
    } catch (e: any) {
      // if (e.response && e.response.status === 422) {
      //   setErrors(e.response.data.errors.error);
      // }
      console.log(setErrors(e.response.data.errors));
    }
  };

  const register = async ({ ...data }) => {
    try {
      const response = await axios.post('/users', data);
      setUser(response.data.data);
      window.location.href = '/dashboard';
    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
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
