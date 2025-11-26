import React from 'react';
import { Button } from '@/components/ui/Button';
import type { Task } from '@/types'; // Type-only import

// Helper function for date formatting
const formatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    // Fallback for invalid date strings
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onViewDetails: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const getPriorityBadgeClasses = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 border border-gray-200 dark:border-gray-700">
      {/* Task Content */}
      <div className="flex-grow flex flex-col space-y-1 w-full md:w-auto text-center md:text-left">
        <h3 className="text-lg font-semibold text-foreground break-words">{task.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Due: {formatDate(task.dueDate)}</p>
        <div
          className={`px-2 py-1 text-xs font-medium rounded-full self-center md:self-start w-fit ${getPriorityBadgeClasses(task.priority)}`}
        >
          {task.priority}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0 w-full md:w-auto justify-center md:justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(task.id)}
          className="w-full sm:w-auto"
        >
          View Details
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(task.id)}
          className="w-full sm:w-auto"
        >
          Edit
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="w-full sm:w-auto text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};