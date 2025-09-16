import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';

const Cart: React.FC = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart ({totalItems} items)
          </h1>
          <Link
            to="/products"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
            
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{totalPrice > 100 ? 'Free' : '$9.99'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    ₹{(totalPrice + (totalPrice > 100 ? 0 : 9.99) + totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Proceed to Checkout
              </button>

              <p className="text-sm text-gray-500 mt-4 text-center">
                {totalPrice < 100 && (
                  <>Add ₹{(100 - totalPrice).toFixed(2)} more for free shipping!</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;