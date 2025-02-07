'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Card {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Card[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  // Fetching favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (product: Card) => {
    const updatedFavorites = favorites.filter((item) => item.id !== product.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    
    // Show a notification when an item is removed
    setNotification(`${product.name} removed from favorites!`);
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  return (
    <div className="p-4 bg-gray-200">
      <button onClick={() => router.push("/")} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
        Back to Products
      </button>
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p>{product.type}</p>
              <Image src={product.imageUrl} alt={product.name} width={150} height={100} className="rounded-md" />
              <button onClick={() => removeFavorite(product)} className="text-red-500 mt-2">
                Remove from Favorites
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center">No favorites added yet.</p>
        )}
      </div>

      {/* Notification for removed favorite */}
      {notification && (
        <div className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
