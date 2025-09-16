import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Review } from '../types';
import { mockReviews } from '../data/mockReviews';
import { useAuth } from './AuthContext';

interface ReviewContextType {
  reviews: Review[];
  addReview: (productId: string, rating: number, comment: string) => void;
  updateReview: (reviewId: string, rating: number, comment: string) => void;
  deleteReview: (reviewId: string) => void;
  getProductReviews: (productId: string) => Review[];
  getUserProductReview: (productId: string, userId: string) => Review | undefined;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const { user } = useAuth();

  const addReview = (productId: string, rating: number, comment: string) => {
    if (!user) return;

    const newReview: Review = {
      id: Date.now().toString(),
      productId,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [...prev, newReview]);
  };

  const updateReview = (reviewId: string, rating: number, comment: string) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, rating, comment }
          : review
      )
    );
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const getProductReviews = (productId: string): Review[] => {
    return reviews.filter(review => review.productId === productId);
  };

  const getUserProductReview = (productId: string, userId: string): Review | undefined => {
    return reviews.find(review => review.productId === productId && review.userId === userId);
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      addReview,
      updateReview,
      deleteReview,
      getProductReviews,
      getUserProductReview
    }}>
      {children}
    </ReviewContext.Provider>
  );
};