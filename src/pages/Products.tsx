import React from 'react';
import { mockProducts } from '../data/mockProducts';
import ProductGrid from '../components/products/ProductGrid';

const Products: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of premium technology and electronics
          </p>
        </div>
        
        <ProductGrid products={mockProducts} />
      </div>
    </div>
  );
};

export default Products;