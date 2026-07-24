import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AdminRoute({ children }) {
  const { session, profile, loading, profileLoading } = useAuth();
  if (loading || (session && profileLoading)) return null;
  if (!session) return <Navigate to="/login" replace />;
  if (!profile?.is_admin) return <Navigate to="/home" replace />;
  return children;
}
