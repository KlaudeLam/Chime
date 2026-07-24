import { NavLink } from 'react-router-dom';
import { HomeIcon, LibraryIcon, PremiumIcon, DownloadIcon } from './icons';

const links = [
  { to: '/home', label: 'Home', Icon: HomeIcon },
  { to: '/library', label: 'Library', Icon: LibraryIcon },
  { to: '/premium', label: 'Premium', Icon: PremiumIcon },
  { to: '/download', label: 'Download', Icon: DownloadIcon },
];

export function NavLinks() {
  return (
    <ul className="flex flex-col gap-3">
      {links.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to}>
          {({ isActive }) => (
            <li className={`w-full flex items-center gap-6 h-8 text-[15px] ${isActive ? 'font-semibold' : 'hover:font-semibold'}`}>
              <Icon />
              {label}
            </li>
          )}
        </NavLink>
      ))}
    </ul>
  );
}
