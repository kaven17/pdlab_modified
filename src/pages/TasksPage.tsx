import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { Task } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const TasksPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Omit<Task, 'id' | 'status' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: tasks.length + 1,
      status: 'To Do',
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    
    if (updatedTask.completed && user) {
      const newScore = user.score + 10;
      updateUser({ ...user, score: newScore });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TaskForm onAddTask={addTask} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TaskList tasks={tasks} onUpdateTask={updateTask} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="col-span-full"
      >
        <div className="glass-morphism p-6">
          <h3 className="text-xl font-semibold mb-4 text-secondary">Task Management Tips</h3>
          <img
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
            alt="Task management"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-text">Effective task management is key to productivity. Remember to prioritize, break down large tasks, and celebrate your accomplishments!</p>
        </div>
      </motion.div>
    </div>
  );
};