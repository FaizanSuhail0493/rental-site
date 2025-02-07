"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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

interface FavoritesContextType {
  favorites: Card[];
  toggleFavorite: (product: Card) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Card[]>([]);

  useEffect(() => {
    // Load favorites from localStorage when the app starts
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage whenever they change
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Card) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === product.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
