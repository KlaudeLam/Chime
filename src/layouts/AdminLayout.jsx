import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const links = [
  { to: '/admin/platform', label: 'Platform' },
  { to: '/admin/search', label: 'Search' },
  { to: '/admin/flags', label: 'Flag control' },
  { to: '/admin/hidden', label: 'Hidden content' },
];

export function AdminLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate('/home');
  }

  return (
    <div className="flex min-h-screen">
      <div id="admin-sidebar" className="w-64 shrink-0 min-h-screen flex flex-col justify-between px-6 pt-7 pb-5 bg-white border-r hidden md:flex">
        <div className="flex flex-col gap-6">
          <div className="text-4xl">Chime!</div>
          <div className="text-sm text-gray-500 -mt-4">Admin dashboard</div>
          <nav>
            <ul className="flex flex-col gap-3">
              {links.map(({ to, label }) => (
                <NavLink key={to} to={to}>
                  {({ isActive }) => (
                    <li className={`w-full h-8 flex items-center text-[15px] ${isActive ? 'font-semibold text-bittersweet' : 'hover:font-semibold'}`}>
                      {label}
                    </li>
                  )}
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
        <div className="text-sm text-gray-500">Signed in as {profile?.username}</div>
      </div>

      <div className="flex-1 min-w-0">
        <div id="admin-top-bar" className="sticky top-0 z-40 w-full h-[64px] px-6 flex items-center justify-between bg-white border-b">
          <nav className="flex gap-2 md:hidden">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} className="text-sm">
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block" />
          <span onClick={handleLogout} className="rounded-3xl bg-[#ffd3da] py-2 px-4 text-sm text-bittersweet hover:font-semibold whitespace-nowrap cursor-pointer select-none">
            Log out
          </span>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
