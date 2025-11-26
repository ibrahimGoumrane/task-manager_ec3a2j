import React from 'react';

const TasksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Container for content, full width on mobile, constrained and centered on larger screens */}
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Your Tasks
        </h1>
        <p className="mt-4 text-base leading-6 text-gray-600 dark:text-gray-300 sm:text-lg lg:text-xl">
          Organize your day, prioritize your work, and achieve your goals.
        </p>

        {/* Placeholder for future task list or management components */}
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md md:p-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Task management features will be integrated here.
            Stay tuned for a powerful and intuitive experience.
          </p>
          <button
            className="mt-6 w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-900
                       sm:px-8 sm:py-4 sm:text-lg"
          >
            Add New Task (Coming Soon!)
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;