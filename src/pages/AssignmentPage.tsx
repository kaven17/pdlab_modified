import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Task } from '../types';
import { Users, CheckSquare } from 'lucide-react';

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', score: 100 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', score: 90 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', score: 80 },
];

const mockTasks: Task[] = [
  { id: 1, title: 'Implement login system', description: 'Create a secure login system', status: 'To Do', assignee: '', priority: 'High', dueDate: '2023-05-15', completed: false, file: null },
  { id: 2, title: 'Design landing page', description: 'Create an attractive landing page', status: 'To Do', assignee: '', priority: 'Medium', dueDate: '2023-05-20', completed: false, file: null },
  { id: 3, title: 'Optimize database queries', description: 'Improve database performance', status: 'To Do', assignee: '', priority: 'High', dueDate: '2023-05-18', completed: false, file: null },
];

export const AssignmentPage: React.FC = () => {
  const [tasks, setTasks] = useState(mockTasks);

  const handleAssign = (taskId: number, userId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, assignee: mockUsers.find(user => user.id === userId)?.name || '' } : task
    ));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-secondary flex items-center">
          <Users className="w-8 h-8 mr-2" />
          Assign Tasks
        </h2>
        <div className="glass-morphism p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text">Available Tasks</h3>
              <ul className="space-y-4">
                {tasks.map(task => (
                  <li key={task.id} className="bg-surface bg-opacity-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-text">{task.title}</h4>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    <p className="text-sm text-gray-400">Priority: {task.priority}</p>
                    <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
                    <p className="text-sm text-gray-400">Assigned to: {task.assignee || 'Unassigned'}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text">Team Members</h3>
              <ul className="space-y-4">
                {mockUsers.map(user => (
                  <li key={user.id} className="bg-surface bg-opacity-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-text">{user.name}</h4>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <p className="text-sm text-gray-400">Score: {user.score}</p>
                    <div className="mt-2">
                      <select
                        onChange={(e) => handleAssign(Number(e.target.value), user.id)}
                        className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
                      >
                        <option value="">Assign a task</option>
                        {tasks.filter(task => !task.assignee).map(task => (
                          <option key={task.id} value={task.id}>{task.title}</option>
                        ))}
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="glass-morphism p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-secondary flex items-center">
            <CheckSquare className="w-6 h-6 mr-2" />
            Task Assignment Best Practices
          </h3>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Team collaboration"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-text">Effective task assignment is crucial for team productivity. Consider team members' skills, workload, and preferences when assigning tasks. Regularly communicate with your team to ensure tasks are progressing smoothly.</p>
        </div>
      </motion.div>
    </div>
  );
};