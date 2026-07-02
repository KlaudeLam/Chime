import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isArtist, setIsArtist] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      const { needsEmailConfirmation } = await signUp(email, password, { username, isArtist });
      if (needsEmailConfirmation) {
        alert('Account created. Check your email to confirm before logging in.');
        navigate('/login');
      } else {
        navigate('/home');
      }
    } catch (err) {
      alert(`Registration failed: ${err.message}`);
    }
  }

  return (
    <div className="w-full first-letter:bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 bg-white">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Register as...</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsArtist(false)}
            className={`w-fit rounded-3xl py-2 px-4 text-sm ${!isArtist ? 'bg-bittersweet text-white' : 'bg-[#ffd3da] text-black'}`}
          >
            User
          </button>
          <button
            onClick={() => setIsArtist(true)}
            className={`w-fit rounded-3xl py-2 px-4 text-sm ${isArtist ? 'bg-bittersweet text-white' : 'bg-[#ffd3da] text-black'}`}
          >
            Artist
          </button>
        </div>
        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John Doe"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
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
            onClick={handleRegister}
            type="button"
            className="w-full bg-bittersweet text-white hover:bg-[#ff3153] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create new account
          </button>
        </div>

        <p className="text-sm font-light text-gray-500">
          Already have an account? <Link to="/login" className="font-medium text-primary-600 underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
