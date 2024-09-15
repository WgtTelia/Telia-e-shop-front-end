'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type SortOption =
  | 'Most popular'
  | 'Price: lowest to highest'
  | 'Price: highest to lowest';

interface SortContextProps {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

interface SortProviderProps {
  children: ReactNode;
}

const SortContext = createContext<SortContextProps | undefined>(undefined);

export const SortProvider: React.FC<SortProviderProps> = ({ children }) => {
  const [sortOption, setSortOption] = useState<SortOption>('Most popular');

  return (
    <SortContext.Provider value={{ sortOption, setSortOption }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSort must be used within a SortProvider');
  }
  return context;
};
