'use client';
import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/mockData';
import axios from 'axios';

export const ProductGrid: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(
                'http://henrika.eu-central-1.elasticbeanstalk.com/api/shop/products'
                //'http://henrika.eu-central-1.elasticbeanstalk.com/api/shop/products?page=0&size=20&sort=id'
            )
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className='flex flex-wrap justify-center gap-4 md:justify-start'>
            {/* TODO add loader, add error component */}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {products.map((product: ProductCardProps) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
};
