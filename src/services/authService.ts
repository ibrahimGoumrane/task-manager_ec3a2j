import type { User } from '@/types';

// Mock in-memory user store to simulate a database.
// In a real application, passwords would be hashed and stored securely,
// and user data would persist in a proper database.
const _mockUsers: User[] = [
  { id: 'user1', username: 'testuser', email: 'test@example.com' },
  { id: 'user2', username: 'admin', email: 'admin@example.com' },
  { id: 'user3', username: 'john.doe', email: 'john.doe@example.com' },
];

/**
 * Generates a simple unique ID string for mock user data.
 * This is not cryptographically secure or guaranteed globally unique for production,
 * but sufficient for in-memory mock data.
 */
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

/**
 * A mock authentication service providing basic login, signup, and logout functionality.
 * It simulates network delays and uses localStorage for session management.
 */
export const authService = {
  /**
   * Simulates a user login attempt.
   * Checks credentials against mock users and stores an authToken in localStorage upon success.
   *
   * @param username The username for login.
   * @param password The password for login (mocked as 'password').
   * @returns A Promise that resolves with the User object if login is successful.
   * @throws An Error if credentials are invalid.
   */
  async login(username: string, password: string): Promise<User> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const user = _mockUsers.find(u => u.username === username);

    // For mock purposes, we assume 'password' is the correct password for all users.
    if (!user || password !== 'password') {
      throw new Error('Invalid username or password');
    }

    localStorage.setItem('authToken', user.id);
    return user;
  },

  /**
   * Simulates a user signup attempt.
   * Checks for existing users, creates a new user, and stores an authToken upon success.
   *
   * @param username The desired username.
   * @param email The desired email.
   * @param password The desired password (not stored, just for mock API consistency).
   * @returns A Promise that resolves with the newly created User object.
   * @throws An Error if the username or email already exists.
   */
  async signup(username: string, email: string, password: string): Promise<User> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const existingUser = _mockUsers.find(
      u => u.username === username || u.email === email
    );

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const newUser: User = {
      id: generateUniqueId(),
      username,
      email,
      // In a real app, the password would be hashed and stored.
      // For this mock, we don't store the password in _mockUsers.
    };

    _mockUsers.push(newUser);
    localStorage.setItem('authToken', newUser.id);
    return newUser;
  },

  /**
   * Simulates a user logout.
   * Removes the authToken from localStorage.
   *
   * @returns A Promise that resolves when the logout operation is complete.
   */
  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    localStorage.removeItem('authToken');
  },

  /**
   * Retrieves the currently logged-in user based on the authToken in localStorage.
   *
   * @returns The User object if an authToken is found and a matching user exists, otherwise null.
   */
  getCurrentUser(): User | null {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return null;
    }
    // Find the user in our mock database based on the stored authToken (user ID).
    // Use || null to ensure a consistent return type of User | null.
    return _mockUsers.find(u => u.id === authToken) || null;
  },
};