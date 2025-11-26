import React, { useEffect } from 'react';
import useAuth from '@/hooks/useAuth.tsx';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if authentication loading is complete and the user is not authenticated.
    // This prevents redirection during the initial auth check.
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]); // Dependencies ensure effect re-runs if these values change.

  // Display a loading message while authentication status is being determined.
  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen px-4 py-8
                      text-base sm:text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300
                      text-center'>
        Loading authentication...
      </div>
    );
  }

  // If the user is authenticated, render the children (the protected route content).
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not loading and not authenticated, the `useEffect` hook will handle the
  // navigation to '/login'. We render `null` here to avoid rendering any
  // protected content before the redirection takes place, ensuring a smooth transition.
  return null;
};

export default AuthLayout;