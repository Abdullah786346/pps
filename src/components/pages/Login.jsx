// src/components/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError('Please verify your email before logging in.');
        return;
      }

      console.log('Login successful:', user);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#de0f3f] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5a631c] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#714616] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="bg-[#de0f3f] bg-opacity-10 p-2 rounded-full">
            <div className="bg-[#de0f3f] bg-opacity-20 p-2 rounded-full">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/logo.jpg"
                  alt="PAS Logo"
                  className="w-16 h-16 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Member <span className="text-[#de0f3f]">Login</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#545454] mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#de0f3f] focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-[#545454]">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-[#de0f3f] hover:text-[#b30c33]">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#de0f3f] focus:border-transparent transition"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-[#de0f3f] focus:ring-[#de0f3f] border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-[#545454]">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#de0f3f] hover:bg-[#b30c33] text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Login to Account
          </button>

          <div className="mt-6 text-center">
            <p className="text-[#545454]">
              New user?{' '}
              <Link
                to="/signup"
                className="font-semibold text-[#de0f3f] hover:text-[#b30c33] hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;