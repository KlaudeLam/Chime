import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  if (loading) return null;
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

export function GuestRoute({ children }) {
  const { session, loading } = useAuth();
  if (loading) return null;
  if (session) return <Navigate to="/home" replace />;
  return children;
}
