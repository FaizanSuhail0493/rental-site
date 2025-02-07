"use client";
import React, { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { RiSteering2Line } from "react-icons/ri";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
import { FaShoppingCart } from "react-icons/fa";

const sanity = sanityClient({
  projectId: "vs37xyyi",
  dataset: "production",
  apiVersion: "2021-08-31",
  useCdn: true,
});

const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<Card[]>([]);
  const [favorites, setFavorites] = useState<Card[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { searchQuery } = useProductContext(); // Get search query from context

  useEffect(() => {
    fetchCars();
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

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

      const data = await sanity.fetch(query);

      const specificIndices = [4, 5, 10, 9];
      const filteredProducts = specificIndices
        .map((index) => data[index])
        .filter(Boolean);

      const processedData = filteredProducts.map((item: any) => ({
        ...item,
        pricePerDay:
          typeof item.pricePerDay === "string"
            ? parseFloat(item.pricePerDay.replace(/[^\d.]/g, ""))
            : item.pricePerDay,
      }));

      setProducts(processedData);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleAddToCart = (product: Card) => {
    addToCart({
      id: product.id,
      name: product.name,
      pricePerDay: product.pricePerDay,
      imageUrl: product.imageUrl,
      quantity: 1,
    });

    showNotification(`${product.name} added to cart!`);
  };

  const toggleFavorite = (product: Card) => {
    const updatedFavorites = favorites.some((fav) => fav.id === product.id)
      ? favorites.filter((fav) => fav.id !== product.id)
      : [...favorites, product];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    showNotification(
      updatedFavorites.some((fav) => fav.id === product.id)
        ? `${product.name} added to favorites!`
        : `${product.name} removed from favorites!`
    );
  };

  const showNotification = (message: string) => {
    console.log("Showing notification:", message); // Debugging
    setNotification(message);
    setTimeout(() => {
      console.log("Clearing notification"); // Debugging
      setNotification(null);
    }, 3000);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col md:flex-row justify-center md:justify-evenly">
      <div className="md:w-[1312px] md:h-[452px] flex flex-col justify-center md:justify-evenly items-center">
        <div className="w-full md:w-[1312px] h-[44px] border-gray-700 pt-4 flex justify-between gap-4">
          <h2 className="pl-9 text-gray-500">Popular Cars</h2>
          <Link href="/cart">
            <p className="text-blue-700 pr-10 cursor-pointer">View Cart</p>
          </Link>
        </div>

        <div className="md:w-[1312px] md:h-[388px] flex flex-col md:flex-row justify-center md:justify-evenly gap-9">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            filteredProducts.map((product) => {
              const isFavorite = favorites.some((fav) => fav.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white h-[388px] w-[304px] rounded-md relative group"
                >
                  <div className="flex justify-between pr-7 pt-5">
                    <p className="ml-3 text-xl font-bold">{product.name}</p>
                    <button onClick={() => toggleFavorite(product)}>
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
                      className="w-[300] h-[30] rounded-md mt-11"
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
            })
          )}
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
