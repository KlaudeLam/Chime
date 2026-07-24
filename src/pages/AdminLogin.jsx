import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchUserProfile } from '../api/users';

export function AdminLogin() {
  const { signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempting, setAttempting] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');
    setAttempting(true);
    try {
      const { user } = await signIn(email, password);
      // Fetch the profile directly rather than watching AuthContext's
      // reactive state -- its own profile-fetch effect runs after this
      // component's effects on the same update (child effects fire before
      // parent effects), so watching session/profile here would read a
      // stale value before AuthContext even starts its fetch.
      const profile = await fetchUserProfile(user.id);
      if (profile?.is_admin) {
        navigate('/admin');
      } else {
        setError("This account doesn't have admin access.");
        await signOut();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setAttempting(false);
    }
  }

  return (
    <div className="w-full first-letter:bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 bg-white">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Admin Portal</h1>
        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="admin@example.com"
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
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={attempting}
            type="button"
            className="w-full bg-bittersweet text-white hover:bg-[#ff3153] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
          >
            {attempting ? 'Signing in…' : 'Sign in as admin'}
          </button>
        </div>
      </div>
    </div>
  );
}
