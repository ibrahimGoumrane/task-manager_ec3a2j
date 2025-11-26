import React from 'react';
import { Task } from '@/types';

interface TaskPreviewProps {
  task: Task | null;
  onClose: () => void;
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) {
    return 'N/A';
  }
  try {
    const date = new Date(dateString);
    // Check if the date is valid (e.g., 'invalid date' string)
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    // Catch potential parsing errors
    return 'Invalid Date';
  }
};

const TaskPreview: React.FC<TaskPreviewProps> = ({ task, onClose }) => {
  const getPriorityClasses = (priority: 'Low' | 'Medium' | 'High') => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getStatusClasses = (status: 'Pending' | 'Completed') => {
    switch (status) {
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'Pending':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full md:w-96 min-h-[200px] flex flex-col'>
      <div className='flex justify-between items-center mb-4 border-b pb-2'>
        {task ? (
          <h2 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>Task Details</h2>
        ) : (
          <h2 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>No Task Selected</h2>
        )}
        <button
          onClick={onClose}
          className='p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          aria-label='Close task preview'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        </button>
      </div>

      {!task ? (
        <div className='flex flex-col items-center justify-center flex-grow text-center text-gray-500 dark:text-gray-400'>
          <p className='text-base md:text-lg'>Select a task to view details</p>
          <svg className='w-16 h-16 mt-4 text-gray-300 dark:text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'></path></svg>
        </div>
      ) : (
        <div className='space-y-4 flex-grow overflow-y-auto'>
          <div>
            <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2'>{task.title}</h3>
          </div>
          <div>
            <p className='font-semibold text-gray-700 dark:text-gray-300 text-sm md:text-base'>Due Date:</p>
            <p className='text-gray-900 dark:text-white mb-2 text-sm md:text-base'>{formatDate(task.dueDate)}</p>
          </div>
          <div>
            <p className='font-semibold text-gray-700 dark:text-gray-300 text-sm md:text-base'>Priority:</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getPriorityClasses(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>
          <div className='mt-2'>
            <p className='font-semibold text-gray-700 dark:text-gray-300 text-sm md:text-base'>Status:</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClasses(
                task.status === 'Completed' ? 'Completed' : 'Pending'
              )}`}
            >
              {task.status}
            </span>
          </div>
          <div className='mt-4'>
            <p className='font-semibold text-gray-700 dark:text-gray-300 text-sm md:text-base'>Description:</p>
            <p className='text-gray-600 dark:text-gray-300 mt-2 whitespace-pre-wrap text-sm md:text-base'>
              {task.description || 'No description provided.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { TaskPreview };