import React from 'react';
import { motion } from 'framer-motion';
import { AIRecommendations } from '../components/AIRecommendations';
import { LeaderBoard } from '../components/LeaderBoard';
import { TaskDelegation } from '../components/TaskDelegation';
import { AIAssistant } from '../components/AIAssistant';
import { generateAIRecommendations } from '../utils/aiUtils';
import { Users, TrendingUp, CheckSquare } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const tasks = [
    { id: 1, title: 'Implement login system', status: 'In Progress', assignee: 'John Doe', priority: 'High', dueDate: '2023-04-15', description: '', completed: false, file: null },
    { id: 2, title: 'Design landing page', status: 'To Do', assignee: 'Jane Smith', priority: 'Medium', dueDate: '2023-04-20', description: '', completed: false, file: null },
  ];
  const users = [
    { id: 1, name: 'John Doe', score: 100, email: '', role: 'user' as const },
    { id: 2, name: 'Jane Smith', score: 80, email: '', role: 'user' as const },
  ];
  const currentUser = { id: 1, name: 'John Doe', score: 100, email: '', role: 'user' as const };
  const aiRecommendations = generateAIRecommendations(tasks, currentUser);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-secondary">Welcome, {currentUser.name}!</h2>
        <div className="glass-morphism p-6">
          <h3 className="text-xl font-semibold mb-2 text-text">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">{tasks.length}</p>
              <p className="text-sm text-text">Active Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">{currentUser.score}</p>
              <p className="text-sm text-text">Your Score</p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AIRecommendations recommendations={aiRecommendations} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <LeaderBoard users={users} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <TaskDelegation tasks={tasks} users={users} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="col-span-full"
      >
        <AIAssistant />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="col-span-full"
      >
        <div className="glass-morphism p-6">
          <h3 className="text-xl font-semibold mb-4 text-secondary flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Team Overview
          </h3>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Team collaboration"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-text">Our team is working hard to achieve our goals. Keep up the great work!</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="col-span-full"
      >
        <div className="glass-morphism p-6">
          <h3 className="text-xl font-semibold mb-4 text-secondary flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            Productivity Tips
          </h3>
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Productivity"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-text">Boost your productivity by prioritizing tasks, taking regular breaks, and maintaining a healthy work-life balance.</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="col-span-full"
      >
        <div className="glass-morphism p-6">
          <h3 className="text-xl font-semibold mb-4 text-secondary flex items-center">
            <CheckSquare className="w-6 h-6 mr-2" />
            Task Management Strategies
          </h3>
          <img
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
            alt="Task management"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-text">Effective task management involves breaking down large tasks, setting realistic deadlines, and regularly reviewing your progress.</p>
        </div>
      </motion.div>
    </div>
  );
};