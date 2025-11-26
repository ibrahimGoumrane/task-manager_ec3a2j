import React from 'react';
import { Button } from '@/components/ui/Button';

/**
 * @interface TaskFiltersProps
 * @description Defines the props for the TaskFilters component.
 */
export interface TaskFiltersProps {
  /**
   * @property {(filters: { dueDate?: 'today' | 'this_week' | 'all', priority?: 'Low' | 'Medium' | 'High' | 'all' }) => void} onFilterChange - Callback triggered when filter criteria change.
   */
  onFilterChange: (filters: { dueDate?: 'today' | 'this_week' | 'all', priority?: 'Low' | 'Medium' | 'High' | 'all' }) => void;
  /**
   * @property {{ dueDate?: 'today' | 'this_week' | 'all', priority?: 'Low' | 'Medium' | 'High' | 'all' }} currentFilters - The currently active filters for styling purposes.
   */
  currentFilters: { dueDate?: 'today' | 'this_week' | 'all', priority?: 'Low' | 'Medium' | 'High' | 'all' };
}

/**
 * @constant dueDateOptions
 * @description Array of available due date filter options.
 */
const dueDateOptions: { value: 'all' | 'today' | 'this_week'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'today', label: 'Today' },
  { value: 'this_week', label: 'This Week' },
];

/**
 * @constant priorityOptions
 * @description Array of available priority filter options.
 */
const priorityOptions: { value: 'all' | 'Low' | 'Medium' | 'High'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

/**
 * @function TaskFilters
 * @description A component that provides filtering options for tasks, including due date and priority.
 *              It supports mobile-first responsive design using Tailwind CSS.
 *
 * @param {TaskFiltersProps} { onFilterChange, currentFilters } - Props for the component.
 * @returns {JSX.Element} The rendered TaskFilters component.
 */
export const TaskFilters: React.FC<TaskFiltersProps> = ({ onFilterChange, currentFilters }) => {

  /**
   * @function handleFilterClick
   * @description Handles a click on a filter button, updating the filter state and triggering the onFilterChange callback.
   * @param {'dueDate' | 'priority'} type - The type of filter being changed ('dueDate' or 'priority').
   * @param {'all' | 'today' | 'this_week' | 'Low' | 'Medium' | 'High'} value - The new value for the selected filter type.
   */
  const handleFilterClick = (
    type: 'dueDate' | 'priority',
    value: 'all' | 'today' | 'this_week' | 'Low' | 'Medium' | 'High'
  ) => {
    onFilterChange({
      ...currentFilters,
      [type]: value,
    });
  };

  /**
   * @function isFilterActive
   * @description Determines if a specific filter button should be styled as active.
   * @param {'dueDate' | 'priority'} type - The type of filter (e.g., 'dueDate').
   * @param {'all' | 'today' | 'this_week' | 'Low' | 'Medium' | 'High'} value - The value of the filter button.
   * @returns {boolean} True if the filter button is active, false otherwise.
   */
  const isFilterActive = (
    type: 'dueDate' | 'priority',
    value: 'all' | 'today' | 'this_week' | 'Low' | 'Medium' | 'High'
  ): boolean => {
    // If the current filter for this type is undefined (no specific filter applied),
    // then 'All' should be considered active.
    if (value === 'all') {
      return !currentFilters[type] || currentFilters[type] === 'all';
    }
    // For other values, directly compare with the current filter.
    return currentFilters[type] === value;
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 sr-only sm:not-sr-only">Due Date:</span>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {dueDateOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => handleFilterClick('dueDate', option.value)}
              variant={isFilterActive('dueDate', option.value) ? 'primary' : 'secondary'}
              size="sm"
              aria-pressed={isFilterActive('dueDate', option.value)}
              className="w-full sm:w-auto" // Ensure buttons are full width on mobile, auto on larger screens
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 sr-only sm:not-sr-only">Priority:</span>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {priorityOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => handleFilterClick('priority', option.value)}
              variant={isFilterActive('priority', option.value) ? 'primary' : 'secondary'}
              size="sm"
              aria-pressed={isFilterActive('priority', option.value)}
              className="w-full sm:w-auto" // Ensure buttons are full width on mobile, auto on larger screens
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};