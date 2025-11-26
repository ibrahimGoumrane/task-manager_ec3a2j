import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth.tsx';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const { isAuthenticated, logout, user, isLoading } = useAuth();

  return (
    <header className='bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between sticky top-0 z-40'>
      <Link to='/' className='text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400'>
        Task Manager
      </Link>
      <nav className='flex items-center space-x-4'>
        <Link to='/tasks' className='text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-base md:text-lg'>
          Tasks
        </Link>
        {isLoading ? (
          <span className='text-gray-600 dark:text-gray-300 text-base md:text-lg'>Loading...</span>
        ) : isAuthenticated && user ? (
          <>
            <span className='text-gray-600 dark:text-gray-300 text-base md:text-lg'>Hello, {user?.username}</span>
            <Button variant='secondary' onClick={logout} className='p-2 text-base'>Logout</Button>
          </>
        ) : (
          <>
            <Link to='/login' className='text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-base md:text-lg'>
              Login
            </Link>
            <Link to='/signup' className='text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-base md:text-lg'>
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};