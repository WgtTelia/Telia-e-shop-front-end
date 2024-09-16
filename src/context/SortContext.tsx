'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SortContextProps {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
}

interface SortProviderProps {
  children: ReactNode;
}

const SortContext = createContext<SortContextProps | undefined>(undefined);

export const SortProvider: React.FC<SortProviderProps> = ({ children }) => {
  const [sortOption, setSortOption] = useState<SortOption>('Most popular');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <SortContext.Provider
      value={{ sortOption, setSortOption, isSheetOpen, setIsSheetOpen }}
    >
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
