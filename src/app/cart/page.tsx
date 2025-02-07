'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import Filters from '../components/Filters';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const Cart: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize filters with default values
  const defaultFilters = {
    pickUpDate: '',
    dropOffDate: '',
    pickUpCity: '',
    dropOffCity: '',
    pickUpTime: '',
    dropOffTime: '',
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [rentalDays, setRentalDays] = useState(1);

  // Load filters from localStorage when the component mounts
  useEffect(() => {
    const savedFilters = localStorage.getItem('rentalFilters');
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters);
        setFilters(parsedFilters ?? defaultFilters);
      } catch (error) {
        console.error("Error parsing filters from localStorage:", error);
        setFilters(defaultFilters);
      }
    }
  }, []);

  // Save filters to localStorage when they change
  useEffect(() => {
    localStorage.setItem('rentalFilters', JSON.stringify(filters));
  }, [filters]);

  // Function to handle filter updates
  const handleFilterChange = (updatedFilters: any) => {
    setFilters(updatedFilters);
  };

  // Calculate rental days when dates change
  useEffect(() => {
    if (filters?.pickUpDate && filters?.dropOffDate) {
      const pickDate = new Date(filters.pickUpDate);
      const dropDate = new Date(filters.dropOffDate);
      const diffTime = dropDate.getTime() - pickDate.getTime();
      const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); // Ensure at least 1 day
      setRentalDays(days);
    }
  }, [filters?.pickUpDate, filters?.dropOffDate]);

  // Show notification
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  // Calculate total price dynamically
  const total = cart.reduce(
    (sum, item) => sum + item.pricePerDay * item.quantity * rentalDays,
    0
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total }),
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({ sessionId: session.id });

    if (result?.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-200">
      {/* Notification UI */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {notification}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Ensure filters exist before passing to Filters */}
      <Filters filters={filters || {}} onFilterChange={handleFilterChange} />

      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <div className=''>
          <div className="grid gap-4 mt-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white flex flex-col md:flex-row items-center gap-4 border p-4 rounded-md">
                <Image src={item.imageUrl} alt={item.name} width={100} height={100} />
                <div className="flex-grow">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-600">Price per day: ${item.pricePerDay}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-800 font-bold">Rental Days: {rentalDays}</p>
                  <p className="text-gray-800 font-bold">Subtotal: ${item.pricePerDay * item.quantity * rentalDays}</p>
                </div>

                {/* Quantity and Remove Buttons */}
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    onClick={() => {
                      increaseQuantity(item.id);
                      showNotification(`${item.name} added to cart!`);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                    onClick={() => {
                      decreaseQuantity(item.id);
                      showNotification(`${item.name} quantity decreased!`);
                    }}
                  >
                    -
                  </button>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded-md"
                    onClick={() => {
                      removeFromCart(item.id);
                      showNotification(`${item.name} removed from cart!`);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-4">
            <h2 className="text-2xl font-bold p-2 mr-2">Total: ${total}</h2>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Back to Products</button>
        </Link>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;