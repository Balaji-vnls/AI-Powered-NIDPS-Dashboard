import React, { useEffect, useState, createContext } from 'react';
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  resetPassword: async () => false
});
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in a real app, this would call an API
    if (email && password) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      // Create mock user - in production this would come from your API
      const newUser = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' as const : 'user' as const
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - in a real app, this would call an API
    if (name && email && password) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      // Create mock user
      const newUser = {
        id: '1',
        name,
        email,
        role: 'user' as const
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  const resetPassword = async (email: string): Promise<boolean> => {
    // Mock password reset - in a real app, this would call an API
    if (email) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return true;
    }
    return false;
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    login,
    register,
    logout,
    resetPassword
  }}>
      {children}
    </AuthContext.Provider>;
};