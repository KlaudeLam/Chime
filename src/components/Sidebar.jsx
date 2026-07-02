import { Link } from 'react-router-dom';
import { NavLinks } from './NavLinks';
import { DesktopPlayer } from './DesktopPlayer';

export function Sidebar() {
  return (
    <div id="left-bar" className="px-6 w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:flex lg:flex-col lg:justify-between pt-7 pb-5 z-30 hidden bg-white">
      <div className="flex flex-col gap-5 mb-6">
        <div id="logo" className="w-full text-5xl flex items-center">
          <Link to="/home">Chime!</Link>
        </div>
        <nav>
          <NavLinks />
        </nav>
      </div>
      <DesktopPlayer />
    </div>
  );
}
