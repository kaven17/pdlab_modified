import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { TasksPage } from './pages/TasksPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { AssignmentPage } from './pages/AssignmentPage';
import { TaskMappingPage } from './pages/TaskMappingPage';
import { TeamsPage } from './pages/TeamsPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { motion } from 'framer-motion';

const PrivateRoute: React.FC<{ element: React.ReactElement; requiredRole?: 'admin' | 'user' }> = ({ element, requiredRole }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;
  return element;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute element={<Layout><Dashboard /></Layout>} />} />
            <Route path="/tasks" element={<PrivateRoute element={<Layout><TasksPage /></Layout>} />} />
            <Route path="/meetings" element={<PrivateRoute element={<Layout><MeetingsPage /></Layout>} />} />
            <Route path="/analytics" element={<PrivateRoute element={<Layout><AnalyticsPage /></Layout>} />} />
            <Route path="/profile" element={<PrivateRoute element={<Layout><ProfilePage /></Layout>} />} />
            <Route path="/assign-tasks" element={<PrivateRoute element={<Layout><AssignmentPage /></Layout>} requiredRole="admin" />} />
            <Route path="/task-mapping" element={<PrivateRoute element={<Layout><TaskMappingPage /></Layout>} requiredRole="admin" />} />
            <Route path="/teams" element={<PrivateRoute element={<Layout><TeamsPage /></Layout>} />} />
          </Routes>
        </motion.div>
      </Router>
    </AuthProvider>
  );
}

export default App;