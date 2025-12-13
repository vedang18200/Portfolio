'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLogOut, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication
    if (credentials.email === 'admin@portfolio.com' && credentials.password === 'admin123') {
      localStorage.setItem('adminToken', 'demo-token');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Demo: admin@portfolio.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">V</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage your portfolio content</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-smooth"
              placeholder="admin@portfolio.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-800 border border-primary-600/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-smooth"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="w-5 h-5" />
                ) : (
                  <HiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 rounded-lg font-semibold transition-smooth"
          >
            Sign In
          </motion.button>

          <p className="text-center text-sm text-gray-400">
            Demo Credentials: admin@portfolio.com / admin123
          </p>
        </form>
      </motion.div>
    </div>
  );
}
