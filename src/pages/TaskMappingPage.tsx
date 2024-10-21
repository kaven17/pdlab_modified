import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types';
import { GitMerge, ArrowRight } from 'lucide-react';

const mockTasks: Task[] = [
  { id: 1, title: 'Implement login system', description: 'Create a secure login system', status: 'To Do', assignee: 'John Doe', priority: 'High', dueDate: '2023-05-15', completed: false, file: null },
  { id: 2, title: 'Design landing page', description: 'Create an attractive landing page', status: 'To Do', assignee: 'Jane Smith', priority: 'Medium', dueDate: '2023-05-20', completed: false, file: null },
  { id: 3, title: 'Optimize database queries', description: 'Improve database performance', status: 'To Do', assignee: 'Bob Johnson', priority: 'High', dueDate: '2023-05-18', completed: false, file: null },
];

export const TaskMappingPage: React.FC = () => {
  const [tasks] = useState(mockTasks);
  const [mappings, setMappings] = useState<{ [key: number]: number[] }>({});

  const handleMapping = (sourceTaskId: number, targetTaskId: number) => {
    setMappings(prevMappings => ({
      ...prevMappings,
      [sourceTaskId]: [...(prevMappings[sourceTaskId] || []), targetTaskId]
    }));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-secondary flex items-center">
          <GitMerge className="w-8 h-8 mr-2" />
          Task Mapping
        </h2>
        <div className="glass-morphism p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text">Source Tasks</h3>
              <ul className="space-y-4">
                {tasks.map(task => (
                  <li key={task.id} className="bg-surface bg-opacity-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-text">{task.title}</h4>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    <p className="text-sm text-gray-400">Assigned to: {task.assignee}</p>
                    <div className="mt-2">
                      <select
                        onChange={(e) => handleMapping(task.id, Number(e.target.value))}
                        className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
                      >
                        <option value="">Map to a task</option>
                        {tasks.filter(t => t.id !== task.id).map(t => (
                          <option key={t.id} value={t.id}>{t.title}</option>
                        ))}
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text">Task Mappings</h3>
              <ul className="space-y-4">
                {Object.entries(mappings).map(([sourceId, targetIds]) => (
                  <li key={sourceId} className="bg-surface bg-opacity-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-text">
                      {tasks.find(t => t.id === Number(sourceId))?.title}
                    </h4>
                    {targetIds.map(targetId => (
                      <div key={targetId} className="flex items-center mt-2">
                        <ArrowRight className="w-4 h-4 mr-2 text-secondary" />
                        <span className="text-sm text-gray-400">
                          {tasks.find(t => t.id === targetId)?.title}
                        </span>
                      </div>
                    ))}
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
            <GitMerge className="w-6 h-6 mr-2" />
            Task Mapping Strategies
          </h3>
          <img
            src="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Task mapping"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-text">Effective task mapping helps in identifying dependencies and streamlining workflows. Consider the relationships between tasks, their priorities, and the skills required to complete them. Regular review and adjustment of task mappings can lead to improved project efficiency.</p>
        </div>
      </motion.div>
    </div>
  );
};