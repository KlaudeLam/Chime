import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HamburgerIcon, SearchIcon, BellIcon } from './icons';

export function TopBar({ onToggleMenu }) {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate('/home');
  }

  return (
    <div id="top-bar" className="sticky top-0 z-40 w-full h-[64px] px-6 flex items-center justify-between">
      <div className="flex">
        <div className="lg:hidden flex items-center mr-4">
          <button onClick={onToggleMenu}>
            <HamburgerIcon />
          </button>
        </div>
        <div className="relative text-gray-600">
          <input type="search" name="search" placeholder="Search" className="bg-white h-10 w-full xl:w-64 px-5 rounded-3xl border text-sm focus:outline-none" />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <BellIcon />
        {session ? (
          <span onClick={handleLogout} className="w-fit rounded-3xl bg-white py-2 px-4 text-sm text-bittersweet hover:font-semibold whitespace-nowrap cursor-pointer select-none">
            Log out
          </span>
        ) : (
          <Link to="/login">
            <span className="w-fit rounded-3xl bg-white py-2 px-4 text-sm text-bittersweet hover:font-semibold whitespace-nowrap">Log in</span>
          </Link>
        )}
      </div>
    </div>
  );
}
