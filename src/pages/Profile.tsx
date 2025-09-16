import React from 'react';
import { User, Mail, Calendar, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-blue-100">Customer</p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="px-6 py-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-gray-900 font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900 font-medium">January 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="px-6 py-8 border-t">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Order #12345</span>
                  </div>
                  <span className="text-sm text-gray-500">Jan 15, 2024</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">2 items • ₹549.98</p>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Delivered
                </span>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Order #12344</span>
                  </div>
                  <span className="text-sm text-gray-500">Jan 10, 2024</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">1 item • ₹299.99</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Shipped
                </span>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Order #12343</span>
                  </div>
                  <span className="text-sm text-gray-500">Jan 5, 2024</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">3 items • ₹899.97</p>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Delivered
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;