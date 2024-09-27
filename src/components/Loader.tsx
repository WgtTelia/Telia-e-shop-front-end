import React, { useEffect } from 'react';

export const Loader = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className='loader-container'>
            <div className='loader'></div>
            <div className='loader'></div>
            <div className='loader'></div>
            <p className='font-semibold text-primary'>Loading...</p>
        </div>
    );
};
