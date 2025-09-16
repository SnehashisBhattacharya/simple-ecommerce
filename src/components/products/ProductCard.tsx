import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
              {product.category}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;