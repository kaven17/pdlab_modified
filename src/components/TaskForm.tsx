import React, { useState } from 'react';
import { Task } from '../types';
import { PlusCircle, Upload } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'status' | 'completed'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({
      title,
      description,
      assignee,
      priority,
      dueDate,
      file,
    });
    setTitle('');
    setDescription('');
    setAssignee('');
    setPriority('Medium');
    setDueDate('');
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-morphism p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-secondary">Add New Task</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-text">
            Assignee
          </label>
          <input
            type="text"
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
            className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
          />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-text">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-text">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="mt-1 block w-full rounded-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-text">
            Attachment
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file"
              className="cursor-pointer bg-surface text-text py-2 px-4 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              {file ? file.name : 'Upload File'}
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Task
      </button>
    </form>
  );
};