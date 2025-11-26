import React, { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const auth = useAuth(); // Returns { login: (username, password) => Promise<void>, isAuthenticated: boolean, error: string | null, isLoading: boolean }
  const navigate = useNavigate();

  // Effect to redirect authenticated users to the tasks page
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/tasks');
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Clear previous errors
    if (!username || !password) {
      setFormError('Both username and password are required.');
      return;
    }
    try {
      await auth.login(username, password);
      // Redirection handled by useEffect
    } catch (error: any) {
      setFormError(auth.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg'>
        <h1 className='text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
              placeholder='Enter your username'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
              placeholder='Enter your password'
              required
            />
          </div>
          {formError && (
            <p className='text-red-600 text-sm md:text-base text-center'>{formError}</p>
          )}
          {auth.isLoading && (
            <p className='text-indigo-600 dark:text-indigo-400 text-sm md:text-base text-center'>Logging in...</p>
          )}
          <Button
            type='submit'
            disabled={auth.isLoading}
            className='w-full justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-base md:text-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {auth.isLoading ? 'Logging In...' : 'Login'}
          </Button>
        </form>
        <p className='mt-6 text-center text-sm text-gray-600 dark:text-gray-400'>
          Don't have an account?{' '}
          <Link to='/register' className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;