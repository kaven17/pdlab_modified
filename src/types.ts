export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  completed: boolean;
  file: File | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  score: number;
}