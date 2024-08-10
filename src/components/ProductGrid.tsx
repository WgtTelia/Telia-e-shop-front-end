import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/mockData';

export const ProductGrid: React.FC = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {products.map((product: ProductCardProps) => (
        <ProductCard key={product.productId} {...product} />
      ))}
    </div>
  );
};
