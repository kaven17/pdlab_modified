import React from 'react';
import { motion } from 'framer-motion';
import { User, Task } from '../types';
import { UserPlus } from 'lucide-react';

interface TaskDelegationProps {
  tasks: Task[];
  users: User[];
}

export const TaskDelegation: React.FC<TaskDelegationProps> = ({ tasks, users }) => {
  const getSuggestions = () => {
    // This is a simple suggestion algorithm. In a real-world scenario, you'd want a more sophisticated approach.
    const suggestions: string[] = [];
    const unassignedTasks = tasks.filter(task => !task.assignee);
    const availableUsers = users.filter(user => tasks.filter(task => task.assignee === user.name).length < 3);

    unassignedTasks.forEach((task, index) => {
      if (availableUsers[index % availableUsers.length]) {
        suggestions.push(`Assign "${task.title}" to ${availableUsers[index % availableUsers.length].name}`);
      }
    });

    return suggestions;
  };

  const suggestions = getSuggestions();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-morphism p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-secondary">
        <UserPlus className="w-6 h-6 mr-2" />
        Task Delegation Suggestions
      </h2>
      {suggestions.length > 0 ? (
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start text-text"
            >
              <span className="text-secondary mr-2">•</span>
              <span>{suggestion}</span>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-text">No delegation suggestions at the moment.</p>
      )}
    </motion.div>
  );
};