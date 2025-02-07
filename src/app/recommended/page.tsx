"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { RiSteering2Line } from "react-icons/ri";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
import { FaShoppingCart } from "react-icons/fa";
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vs37xyyi',
  dataset: 'production',
  apiVersion: '2021-08-31',
  useCdn: true,
});



const Recommended: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Card[]>([]);
  const { addToCart } = useCart();
  const { searchQuery } = useProductContext(); // Get search query from context

  const fetchCards = async () => {
    try {
      const dataQuery = `*[_type == "car"][0...16]{
                "id": _id,
                name,
                pricePerDay,
                type,
                fuelCapacity,
                transmission,
                seatingCapacity,
                "imageUrl": image.asset->url
            }`;

      const data = await client.fetch(dataQuery);
      const desiredIndices = [1, 2, 3, 6, 7, 8, 10, 11, 12, 13, 14, 15];
      const filteredCards = desiredIndices
        .map((index) => data[index])
        .filter(Boolean);

      const processedData = filteredCards.map((item: any) => ({
        ...item,
        pricePerDay:
          typeof item.pricePerDay === "string"
            ? parseFloat(item.pricePerDay.replace(/[^\d.]/g, ""))
            : item.pricePerDay,
      }));

      setCards(processedData);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const handleAddToCart = (product: Card) => {
    addToCart({
      id: product.id,
      name: product.name,
      pricePerDay: product.pricePerDay,
      imageUrl: product.imageUrl,
      quantity: 1,
    });

    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleFavorite = (product: Card) => {
    const updatedFavorites = favorites.some((fav) => fav.id === product.id)
      ? favorites.filter((fav) => fav.id !== product.id)
      : [...favorites, product];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setNotification(
      updatedFavorites.some((fav) => fav.id === product.id)
        ? `${product.name} added to favorites!`
        : `${product.name} removed from favorites!`
    );

    setTimeout(() => setNotification(null), 3000);
  };

  // Filter cards based on search query
  const filteredCards = cards.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-evenly">
        <div className="md:w-[1312px] flex flex-col justify-center md:justify-evenly items-center">
          <div className="w-full md:w-[1312px] h-[44px] border-gray-700 pt-4 flex justify-between gap-4">
            <h2 className="pl-9 text-gray-500">Recommendation Cars</h2>
            <p className="text-blue-700 pr-10">View All</p>
          </div>
          <br />
          <div className="md:w-[1312px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center md:justify-evenly gap-9">
            {filteredCards.map((product) => {
              const isFavorite = favorites.some((fav) => fav.id === product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white h-[388px] w-[304px] rounded-md relative group"
                >
                  <div className="flex justify-between pr-7 pt-5">
                    <p className="ml-3 text-xl font-bold">{product.name}</p>
                    <button onClick={() => handleToggleFavorite(product)}>
                      {isFavorite ? (
                        <IoIosHeart size={24} color="red" />
                      ) : (
                        <IoIosHeartEmpty size={24} />
                      )}
                    </button>
                  </div>
                  <p className="ml-3">{product.type}</p>
                  <Link href={`/ProductDetails/${product.id}`}>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-300 h-300 rounded-md mt-11"
                    />
                  </Link>
                  <div className="flex mt-8 ml-4 gap-2 text-gray-400">
                    <BsFuelPumpDiesel size={24} />
                    <p>{product.fuelCapacity}</p>
                    <RiSteering2Line size={24} />
                    <p>{product.transmission}</p>
                    <IoPeople size={24} />
                    <p>{product.seatingCapacity}</p>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <h1 className="font-bold text-blue-500 text-2xl">
                      ${product.pricePerDay}/day
                    </h1>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Link
          href={"/categories"}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 mr-4 sm:mb-8"
        >
          Show More Cars
        </Link>
      </div>

      {notification && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Recommended;
