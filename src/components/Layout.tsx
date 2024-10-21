import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, CheckSquare, Calendar, BarChart2, LogOut, User, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-secondary">Collaborative Task Manager</h1>
          <nav className="space-x-8">
            <Link to="/" className="text-text hover:text-secondary"><Home className="inline w-6 h-6" /></Link>
            <Link to="/tasks" className="text-text hover:text-secondary"><CheckSquare className="inline w-6 h-6" /></Link>
            <Link to="/meetings" className="text-text hover:text-secondary"><Calendar className="inline w-6 h-6" /></Link>
            <Link to="/analytics" className="text-text hover:text-secondary"><BarChart2 className="inline w-6 h-6" /></Link>
            <Link to="/teams" className="text-text hover:text-secondary"><Users className="inline w-6 h-6" /></Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-text hover:text-secondary">
              <User className="w-6 h-6" />
            </Link>
            <span className="text-sm font-medium text-text">{user?.name}</span>
            <LogOut className="w-6 h-6 text-text cursor-pointer" onClick={handleLogout} />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};