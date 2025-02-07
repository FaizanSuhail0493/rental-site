'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Card {
  id: string;
  name: string;
  pricePerDay: number;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: number;
  imageUrl: string;
}

interface ProductContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Card[];
  setProducts: (products: Card[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Card[]>([]); // Added products state

  return (
    <ProductContext.Provider value={{ searchQuery, setSearchQuery, products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
