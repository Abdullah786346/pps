// src/components/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to send reset email. Please check the email address.');
      setLoading(false);
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
          Reset <span className="text-[#de0f3f]">Password</span>
        </h2>

        <form onSubmit={handleResetPassword} className="space-y-5">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#de0f3f] hover:bg-[#b30c33] text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-[#545454]">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-semibold text-[#de0f3f] hover:text-[#b30c33] hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;