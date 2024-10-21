import React from 'react';
import { Task } from '../types';
import { CheckCircle, Clock, AlertCircle, Download } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const handleStatusChange = (task: Task, newStatus: string) => {
    const updatedTask = { ...task, status: newStatus };
    if (newStatus === 'Done' && !task.completed) {
      updatedTask.completed = true;
    } else if (newStatus !== 'Done' && task.completed) {
      updatedTask.completed = false;
    }
    onUpdateTask(updatedTask);
  };

  return (
    <div className="glass-morphism p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-secondary">Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="border-b border-gray-700 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-text">{task.title}</h3>
                <p className="text-sm text-gray-400">{task.description}</p>
                <p className="text-sm text-gray-400">Assigned to: {task.assignee}</p>
                <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getPriorityIcon(task.priority)}
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task, e.target.value)}
                  className="bg-surface text-text rounded px-2 py-1 text-sm"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                {task.completed && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {task.file && (
                  <a
                    href={URL.createObjectURL(task.file)}
                    download={task.file.name}
                    className="text-secondary hover:text-blue-400"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};