import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useReviews } from '../../context/ReviewContext';

interface ReviewFormProps {
  productId: string;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onClose }) => {
  const { user } = useAuth();
  const { addReview } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addReview(productId, rating, comment);
    onClose();
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">Please log in to leave a review.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="text-yellow-400 hover:text-yellow-500 transition-colors"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoveredRating || rating) ? 'fill-current' : ''
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          required
        />
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Review
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;