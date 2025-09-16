import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockUsers';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, isAdmin?: boolean) => boolean;
  register: (name: string, email: string, password: string, isAdmin?: boolean) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, isAdmin: boolean = false): boolean => {
    // Mock authentication: check email, password, and isAdmin
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password && u.isAdmin === isAdmin
    );

    if (foundUser) {
      setUser({ ...foundUser });
      return true;
    }
    return false;
  };

  const register = (
    name: string,
    email: string,
    password: string,
    isAdmin: boolean = false
  ): boolean => {
    const existingUser = mockUsers.find(u => u.email === email);
    if (!existingUser) {
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name,
        email,
        isAdmin,
        createdAt: new Date().toISOString(),
        password, // store password for login
      };
      mockUsers.push(newUser);
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
