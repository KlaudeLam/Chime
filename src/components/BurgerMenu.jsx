import { NavLinks } from './NavLinks';

export function BurgerMenu({ open }) {
  return (
    <div
      id="hidden-menu"
      className={`w-full mt-[64px] bg-white py-4 px-6 rounded-b-lg lg:h-0 lg:p-0 shadow-sm z-40 ${open ? '' : 'hidden'}`}
      style={open ? { position: 'fixed' } : undefined}
    >
      <NavLinks />
    </div>
  );
}
