'use client';

import React, { useEffect, useState } from 'react';
import {
    getAllClassifiers,
    ClassifiersData,
} from '@/lib/services/classifiersService';

export const FilterCheckboxesGroup: React.FC = () => {
    const [classifiers, setClassifiers] = useState<ClassifiersData | null>(
        null
    );

    useEffect(() => {
        getAllClassifiers().then(setClassifiers);
    }, []);

    if (!classifiers) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {Object.entries(classifiers).map(([key, values]) => (
                <div key={key}>
                    <h2>{key}</h2>
                    {values.map((value: string) => (
                        <label key={value}>
                            <input type='checkbox' value={value} />
                            {value}
                        </label>
                    ))}
                </div>
            ))}
        </div>
    );
};
