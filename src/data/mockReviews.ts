import { Review } from '../types';

export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    userName: 'Surjakanta Das',
    rating: 5,
    comment: 'বালের জিনিস ',
    createdAt: '2024-01-25'
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    userName: 'Priya Verma',
    rating: 4,
    comment: 'Great headphones overall. The battery life could be better but the audio quality is excellent.',
    createdAt: '2024-01-30'
  },
  {
    id: '3',
    productId: '2',
    userId: '4',
    userName: 'Rohan Mehta',
    rating: 5,
    comment: 'Perfect fitness companion! Tracks everything accurately and the battery really does last 7 days.',
    createdAt: '2024-02-05'
  },
  {
    id: '4',
    productId: '3',
    userId: '5',
    userName: 'Sneha Iyer',
    rating: 5,
    comment: 'This laptop is incredibly fast and lightweight. Perfect for travel and work.',
    createdAt: '2024-02-12'
  },
  {
    id: '5',
    productId: '4',
    userId: '1',
    userName: 'Aarav Sharma',
    rating: 4,
    comment: 'Excellent camera with great image quality. Takes some time to learn all the features.',
    createdAt: '2024-02-15'
  }
];
