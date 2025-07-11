import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create context
const AuthContext = createContext(undefined);

// Create custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const authenticateUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('HRDS_ACCESS');
      if (!token) {
        setCurrentUser(null);
        navigate('/');
        return;
      }

      // Corrected Axios call: headers in third parameter
      const response = await axios.post(
        "http://localhost:3000/authenticate",
        null, // Empty body
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (response.data.user) {
        setCurrentUser(response.data.user);
        navigate('/dashboard');
      } else {
        setCurrentUser(null);
        navigate('/');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setCurrentUser(null);
      setError('Failed to authenticate user');
      navigate('/');
    }
  }, [navigate]); // Add navigate to dependencies

  const loginWithGoogle = useCallback(async (credentialResponse) => {
    try {
      // Send Google credential to backend
      const response = await axios.post("http://localhost:3000/auth/google",
        { token: credentialResponse.credential });

      if (response.data.token) {
        // Store user data in local state
        const token = response.data.token;
        localStorage.setItem('HRDS_ACCESS', token);
        navigate('/dashboard'); // Redirect to dashboard after login
        const { name, email } = response.data.user;
        setCurrentUser({
          name: name,
          email: email
        });
        setMessage(data.message);
        console.log('User logged in:', UserByEmail);
      } else {
        setError(data.message);
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      setError('Failed to authenticate with Google (Server Wont Respond)');
    }
  }, []);

  const logout = useCallback(() => {
    try {

      setCurrentUser(null);
      localStorage.removeItem('HRDS_ACCESS');
      setMessage('Logged out successfully');
      navigate('/'); // Redirect to login after logout

    } catch (error) {
      setError('Failed to log out');
      console.error('Logout error:', error);
      return false;
    }
  }, [navigate]);


  const value = {
    currentUser,
    message,
    setMessage,
    error,
    setError,
    loginWithGoogle,
    logout,
    authenticateUser,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};