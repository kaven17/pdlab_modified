import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  score: number;
  description?: string;
  profilePicture?: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you'd make an API call here
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email: email,
      role: email.includes('admin') ? 'admin' : 'user',
      score: 100,
      description: 'A passionate developer',
      profilePicture: null,
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};