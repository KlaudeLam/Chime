import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchUserProfile } from '../api/users';

export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const { user } = await signIn(email, password);
      // Fetch the profile directly rather than watching AuthContext's reactive
      // state -- see AdminLogin for why (its own profile-fetch effect runs a
      // render behind this one, so relying on it here would read stale data).
      const profile = await fetchUserProfile(user.id);
      navigate(profile?.is_admin ? '/admin' : '/home');
    } catch (err) {
      alert(`Log in failed: ${err.message}`);
    }
  }

// Admin test
// Email: admin@chime.test
// Password: ChimeAdmin!2026
// Username: chime_admin, is_admin = true

// User test
// Email: usertest@gmail.com
// Password: 123456

// Artist test
// Email: artisttest@gmail.com
// Password: 123456

  return (
    <div className="w-full first-letter:bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 bg-white">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Log in as...</h1>
        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="johndoe@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            type="button"
            className="w-full bg-bittersweet text-white hover:bg-[#ff3153] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Log in
          </button>
        </div>

        <p className="text-sm font-light text-gray-500">
          Haven't got an account? <Link to="/register" className="font-medium text-primary-600 underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
