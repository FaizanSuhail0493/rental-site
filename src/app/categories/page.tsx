'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { RiSteering2Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vs37xyyi',
  dataset: 'production',
  apiVersion: '2021-08-31',
  useCdn: true,
});

const Categories: React.FC = () => {
  const [products, setProducts] = useState<Card[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Card[]>([]);
  const { addToCart } = useCart();
  const [notification, setNotification] = useState<string | null>(null);
  const { searchQuery } = useProductContext();
   const [favorites, setFavorites] = useState<Card[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<number>(500);

  const fetchCars = async () => {
    try {
      const query = `*[_type == "car"][0...15]{
        name,
        pricePerDay,
        type,
        fuelCapacity,
        transmission,
        seatingCapacity,
        "id": _id,
        "imageUrl": image.asset->url,
      }`;

      const data = await client.fetch(query);

      const processedData = data.map((item: any) => ({
        ...item,
        pricePerDay:
          typeof item.pricePerDay === "string"
            ? parseFloat(item.pricePerDay.replace(/[^\d.]/g, ""))
            : item.pricePerDay,
      }));

      setProducts(processedData);
      setFilteredProducts(processedData);
    } catch (error) {
      console.error("Error fetching cars", error);
    }
  };
  

  useEffect(() => {
    fetchCars();
  }, []);

   useEffect(() => {
          fetchCars();
          const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
          setFavorites(storedFavorites);
      }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (selectedType) {
      filtered = filtered.filter((product) => product.type === selectedType);
    }
    if (selectedCapacity) {
      filtered = filtered.filter(
        (product) => parseInt(product.seatingCapacity, 10) === selectedCapacity
      );
    }
    if (priceRange) {
      filtered = filtered.filter((product) => product.pricePerDay <= priceRange);
    }
    setFilteredProducts(filtered);
  }, [searchQuery, selectedType, selectedCapacity, priceRange, products]);

  const resetFilters = () => {
    setSelectedType(null);
    setSelectedCapacity(null);
    setPriceRange(500);
    setFilteredProducts(products);
  };

  const handleAddToCart = (product: Card) => {
    addToCart({ ...product, quantity: 1 });
    setNotification(`Added ${product.name} to cart!`);
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

  return (
    <div className="w-full flex md:flex-col bg-gray-200">
      <div className="flex justify-center">
        <div className="hidden md:block md:w-[240px] md:h-[2300px] p-5 bg-white border-r border-gray-300 ml-14">
          <h3 className="text-sm text-gray-500 mb-2">Type</h3>
          <ul className="space-y-3">
            {["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"].map((type) => (
              <li key={type}>
                <input
                  type="checkbox"
                  id={type}
                  className="mr-2"
                  checked={selectedType === type}
                  onChange={() =>
                    setSelectedType(selectedType === type ? null : type)
                  }
                />
                <label htmlFor={type}>{type}</label>
              </li>
            ))}
          </ul>
          <h3 className="text-sm text-gray-500 mt-6">Capacity</h3>
          <ul className="space-y-3">
            {[2, 4, 6, 8].map((capacity) => (
              <li key={capacity}>
                <input
                  type="checkbox"
                  id={`${capacity}person`}
                  className="mr-2"
                  checked={selectedCapacity === capacity}
                  onChange={() =>
                    setSelectedCapacity(
                      selectedCapacity === capacity ? null : capacity
                    )
                  }
                />
                <label htmlFor={`${capacity}person`}>{capacity} Person</label>
              </li>
            ))}
          </ul>
          <h3 className="text-sm text-gray-500 mt-6">Price</h3>
          <input
            type="range"
            min="50"
            max="500"
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <p className="text-sm text-gray-700">Up to ${priceRange}/day</p>
          <button
            onClick={resetFilters}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Show All Cars
          </button>
        </div>

        <div className="sm:w-full md:w-[1015px]">
          <div className="sm:w-full md:w-[1015px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 p-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white h-[388px] w-[304px] rounded-md relative">
                <div className="flex justify-between pr-7 pt-5">
                  <p className="ml-3 text-xl font-bold">{product.name}</p>
                  <button onClick={() => handleToggleFavorite(product)}>
                    {favorites.some((fav) => fav.id === product.id) ? (
                      <IoIosHeart size={24} color="red" />
                    ) : (
                      <IoIosHeartEmpty size={24} />
                    )}
                  </button>
                </div>
                <Link href={`/ProductDetails/${product.id}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-300 h-30 rounded-md mt-11"
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
                  <h1 className="font-bold text-blue-500 text-2xl">${product.pricePerDay}/day</h1>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {notification && <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">{notification}</div>}
    </div>
  );
};

export default Categories;
