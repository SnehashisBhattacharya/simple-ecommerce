import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Home, Package, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TechStore</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/products"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/products') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Products</span>
            </Link>
            <Link
              to="/cart"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors relative ${
                isActive('/cart') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.isAdmin ? (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                      isActive('/profile') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden md:block">{user.name}</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile cart button */}
          <Link
            to="/cart"
            className="md:hidden relative p-2 text-gray-700 hover:text-blue-600"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;