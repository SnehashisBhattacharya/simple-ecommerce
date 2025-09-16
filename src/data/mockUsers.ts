import { User } from '../types';

export const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    isAdmin: false,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'jane123',
    isAdmin: false,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',  // ✅ Add password here
    isAdmin: true,
    createdAt: '2024-01-01'
  },
];
