import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  // Check if user is authenticated or loading
  if (loading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render the children if user is authenticated
  return children;
}

export default PrivateRoute;
