import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { BurgerMenu } from '../components/BurgerMenu';
import { TopBar } from '../components/TopBar';
import { MobilePlayer } from '../components/MobilePlayer';
import { Footer } from '../components/Footer';
import { TrackContextMenu } from '../components/TrackContextMenu';

export function AppLayout() {
  const { session, profile, loading, profileLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Admins only ever use the admin dashboard -- bounce them out of every
  // fan/artist page before it renders. Mirrors AdminRoute's loading guard so
  // this doesn't block guests (who have no session/profile to wait on).
  if (loading || (session && profileLoading)) return null;
  if (profile?.is_admin) return <Navigate to="/admin" replace />;

  return (
    <div className="flex flex-wrap">
      <TrackContextMenu />

      <Sidebar />
      <BurgerMenu open={menuOpen} />

      <div id="right-body" className="w-full pl-0 lg:pl-64 min-h-screen">
        <TopBar onToggleMenu={() => setMenuOpen((open) => !open)} />
        <MobilePlayer />

        <Outlet />

        <Footer />
      </div>
    </div>
  );
}
