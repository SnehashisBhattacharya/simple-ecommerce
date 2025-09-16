import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LoginProps {
  isAdmin?: boolean;
}

const Login: React.FC<LoginProps> = ({ isAdmin = false }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const success = login(email, password, isAdmin);

    if (success) {
      navigate(isAdmin ? '/admin' : '/');
    } else {
      setError(isAdmin ? 'Invalid admin credentials' : 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isAdmin ? 'Admin Login' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isAdmin ? (
              'Access the admin dashboard'
            ) : (
              <>
                Or{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  create a new account
                </Link>
              </>
            )}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isAdmin ? 'Access Admin Panel' : 'Sign in'}
            </button>
          </div>

          <div className="text-center space-y-2">
            {!isAdmin && (
              <Link to="/admin/login" className="text-sm text-gray-600 hover:text-blue-600">
                Admin Login
              </Link>
            )}
            {isAdmin && (
              <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600">
                User Login
              </Link>
            )}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
            <div className="text-sm text-blue-700 mt-1">
              {isAdmin ? (
                <>
                  <p>Email: admin@example.com</p>
                  <p>Password: any password</p>
                </>
              ) : (
                <>
                  <p>Email: john@example.com</p>
                  <p>Password: any password</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
