// src/components/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    role: 'farmer',
    agreeTerms: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      alert("Verification email sent. Please check your inbox.");

      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        organization: formData.organization,
        role: formData.role,
        createdAt: new Date().toISOString(),
      });

      navigate('/login');

    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#de0f3f] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#5a631c] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-[#714616] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#de0f3f] bg-opacity-10 rounded-full mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border-4 border-[#de0f3f] border-opacity-30">
              <img src="/assets/logo.jpg" alt="PAS Logo" className="w-16 h-16 object-cover" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Create Your <span className="text-[#de0f3f]">Account</span>
          </h2>
          <p className="text-[#545454] mt-2">Join the Poultry Association Society community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#545454] mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#de0f3f] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#545454] mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#de0f3f] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#545454] mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#de0f3f] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-[#545454] mb-1">Organization/Farm</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Sunshine Poultry Farm"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#de0f3f] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-[#545454] mb-1">Your Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#de0f3f] focus:border-transparent"
            >
              <option value="farmer">Poultry Farmer</option>
              <option value="researcher">Researcher</option>
              <option value="veterinarian">Veterinarian</option>
              <option value="supplier">Supplier</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#545454] mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#de0f3f] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#545454] mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#de0f3f] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="h-4 w-4 text-[#de0f3f] focus:ring-[#de0f3f] border-gray-300 rounded"
              required
            />
            <label htmlFor="agreeTerms" className="ml-2 text-[#545454] text-sm">
              I agree to the <a href="#" className="text-[#de0f3f] font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-[#de0f3f] font-medium hover:underline">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#de0f3f] hover:bg-[#b30c33] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Create Account
          </button>

          <p className="text-center mt-4 text-[#545454] text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#de0f3f] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;