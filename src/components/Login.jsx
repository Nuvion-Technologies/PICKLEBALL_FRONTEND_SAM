import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, Mail } from 'lucide-react';
import { FaTableTennis, FaRegFutbol } from "react-icons/fa";
import "../context/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login({ email, password });
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#292333]">
      <div className="pickleball-container hidden lg:block">
        <img
          src="src/assets/ball3.png"
          alt="Pickleball Ball"
          className="pickleball"
        />
      </div>

      <div className="w-full max-w-md p-8 relative">
        <div className="text-center mb-8 transform transition-transform">
          <div className="inline-block mb-4">
            <img
              src="src/assets/fnr_cropped.jpg"
              alt="Flick N Roll Logo"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 backdrop-blur-sm text-white text-center border border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <div className="relative flex items-center">
              <FaRegFutbol className="absolute left-3 text-gray-400 text-lg" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all hover:bg-white/20"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative flex items-center">
              <FaTableTennis className="absolute left-3 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all hover:bg-white/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md border border-white/20 hover:border-white/40 transform hover:scale-105"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;