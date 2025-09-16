import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="h-20 w-20 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
        <p className="text-gray-600">${item.product.price}</p>
        <p className="text-sm text-gray-500">{item.product.category}</p>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="font-medium text-lg min-w-[2rem] text-center">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          disabled={item.quantity >= item.product.stock}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-lg">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="text-red-500 hover:text-red-700 transition-colors mt-2"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;