import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div id="logo" className="text-5xl mb-8">Chime!</div>
      <Outlet />
    </div>
  );
}
