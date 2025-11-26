import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the authentication context
interface AuthContextType {
  user: any | null; // In a real application, replace 'any' with a specific User type
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Create the AuthContext with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// The AuthProvider component manages authentication state and provides it
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate checking authentication status on component mount
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        // In a real application, this would involve checking tokens in localStorage, cookies,
        // or making an API call to validate a session.
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async check
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to check authentication status.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Function to simulate user login
  const login = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call for login
      await new Promise(resolve => setTimeout(resolve, 1000));
      const fakeUser = { id: 'user-123', name: 'Demo User', email: 'demo@example.com' }; // Example user data
      setUser(fakeUser);
      localStorage.setItem('currentUser', JSON.stringify(fakeUser));
    } catch (err: any) {
      setError(err.message || 'Login failed.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to simulate user logout
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call for logout
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      localStorage.removeItem('currentUser');
    } catch (err: any) {
      setError(err.message || 'Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  const authContextValue = {
    user,
    login,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// The useAuth hook to consume the authentication context
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Explicitly make 'useAuth' the default export
export default useAuth;

// Export 'AuthContext' and 'AuthProvider' as named exports
export { AuthContext, AuthProvider };