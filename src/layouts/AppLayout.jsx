import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { BurgerMenu } from '../components/BurgerMenu';
import { TopBar } from '../components/TopBar';
import { MobilePlayer } from '../components/MobilePlayer';
import { Footer } from '../components/Footer';
import { TrackContextMenu } from '../components/TrackContextMenu';

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

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
