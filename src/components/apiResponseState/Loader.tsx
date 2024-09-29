import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className='relative flex w-full items-center justify-center'>
            <div className='loader'></div>
            <div className='loader'></div>
            <div className='loader'></div>
            <p className='mt-48 font-semibold text-primary'>Loading...</p>
        </div>
    );
};
