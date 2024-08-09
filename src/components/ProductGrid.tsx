import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/mockData';

export const ProductGrid = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {products.map((product: ProductCardProps) => (
        <ProductCard
          key={product.productId}
          productId={product.productId}
          productImage={product.productImage}
          brandName={product.brandName}
          modelName={product.modelName}
          availableColors={product.availableColors}
          shortDescription={product.shortDescription}
          pricePerMonth={product.pricePerMonth}
          productType={product.productType}
        />
      ))}
    </div>
  );
};
