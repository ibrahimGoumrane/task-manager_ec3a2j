import React, { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const SignupPage = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users away from the signup page
    if (auth.isAuthenticated) {
      navigate('/tasks');
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null); // Clear previous form errors

    // Client-side validation
    if (!username || !email || !password || !confirmPassword) {
      setFormError('All fields are required.');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    // Password matching validation
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await auth.signup(username, email, password);
      // The useEffect hook will handle navigation on successful authentication
      // On success, clear password fields for security/UX
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      // The useAuth hook is responsible for setting auth.error
      // No explicit state update needed here for auth.error, it's handled by the hook.
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 space-y-6'>
        <h2 className='text-3xl font-bold text-center text-gray-900 dark:text-white'>
          Create an Account
        </h2>

        <form onSubmit={handleSignup} className='space-y-4'>
          <div>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='block w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:ring-purple-500 focus:border-purple-500'
              disabled={auth.isLoading}
            />
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='block w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:ring-purple-500 focus:border-purple-500'
              disabled={auth.isLoading}
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='block w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:ring-purple-500 focus:border-purple-500'
              disabled={auth.isLoading}
            />
          </div>

          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='block w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:ring-purple-500 focus:border-purple-500'
              disabled={auth.isLoading}
            />
          </div>

          {(formError || auth.error) && (
            <p className='text-red-500 text-sm mt-1'>{formError || auth.error}</p>
          )}

          <Button
            variant='primary'
            type='submit'
            className='w-full p-3 text-base md:text-lg'
            disabled={auth.isLoading}
          >
            {auth.isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>

        <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300'
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;