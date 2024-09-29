import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className='loader-container'>
            <div className='loader'></div>
            <div className='loader'></div>
            <div className='loader'></div>
            <p className='font-semibold text-primary'>Loading...</p>
        </div>
    );
};
