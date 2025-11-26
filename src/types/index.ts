// Add your TypeScript type definitions here

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string; // ISO date string for simplicity
  priority: 'Low' | 'Medium' | 'High';
  userId: string;
}

export interface TaskFilterOptions {
  dueDate?: 'today' | 'this_week' | 'all' | undefined;
  priority?: 'Low' | 'Medium' | 'High' | 'all' | undefined;
}

export interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onEdit: (updatedTask: Task) => Promise<void>;
  onAddTask: (newTaskData: Omit<Task, 'id' | 'status'>) => Promise<void>;
}

export interface TaskPreviewProps {
  task: Task | null;
  onClose: () => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}