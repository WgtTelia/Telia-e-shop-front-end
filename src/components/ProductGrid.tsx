import React from 'react';
import { ProductCard } from 'src/components/ProductCard';
import { phones } from 'src/data/mockData';

export const ProductGrid = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {phones.map((phone) => (
        <ProductCard
          key={phone.modelName} 
          brandName={phone.brandName}
          modelName={phone.modelName}
          availableColors={phone.availableColors}
          shortDescription={phone.shortDescription}
          pricePerMonth={phone.pricePerMonth}
        />
      ))}
    </div>
  );
};
