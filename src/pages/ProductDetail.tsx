import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import ReviewCard from '../components/reviews/ReviewCard';
import ReviewForm from '../components/reviews/ReviewForm';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { getProductReviews, getUserProductReview } = useReviews();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const reviews = getProductReviews(product.id);
  const userReview = user ? getUserProductReview(product.id, user.id) : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= product.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-medium text-lg min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-500">
                  ({product.stock} available)
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg font-medium"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Reviews ({reviews.length})
            </h2>
            {user && !userReview && !showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Write Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <div className="mb-6">
              <ReviewForm
                productId={product.id}
                onClose={() => setShowReviewForm(false)}
              />
            </div>
          )}

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <Star className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-500">
                Be the first to review this product and help others make informed decisions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;