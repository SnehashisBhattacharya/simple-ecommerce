import React, { useState } from 'react';
import { Star, Edit, Trash2, Save, X } from 'lucide-react';
import { Review } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useReviews } from '../../context/ReviewContext';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { user } = useAuth();
  const { updateReview, deleteReview } = useReviews();
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(review.rating);
  const [editComment, setEditComment] = useState(review.comment);

  const handleSave = () => {
    updateReview(review.id, editRating, editComment);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditRating(review.rating);
    setEditComment(review.comment);
    setIsEditing(false);
  };

  const canEdit = user && user.id === review.userId;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-gray-900">{review.userName}</h4>
          <p className="text-sm text-gray-500">{review.createdAt}</p>
        </div>
        
        {canEdit && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="text-green-600 hover:text-green-700"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-gray-600 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setEditRating(star)}
                className="text-yellow-400 hover:text-yellow-500"
              >
                <Star
                  className={`h-5 w-5 ${star <= editRating ? 'fill-current' : ''}`}
                />
              </button>
            ))}
          </div>
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= review.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </>
      )}
    </div>
  );
};

export default ReviewCard;