'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaHeart } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { PiSlidersHorizontal } from 'react-icons/pi';
import { useProductContext } from '../../context/ProductContext';
import { BsCartCheckFill } from 'react-icons/bs';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSearchQuery } = useProductContext();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSearchQuery(event.target.value);
  };

  return (
    <div className=" bg-white shadow-md border-t-4 border-blue-600">
      <div className="md:w-[1312px] h-[124px] flex items-center justify-between px-5 mx-auto">
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link href="/">
            <div className="text-blue-600 text-xl md:text-2xl font-bold">MORENT</div>
          </Link>
          <div className="hidden md:flex items-center w-full md:w-[492px] h-[44px] bg-gray-100 rounded-full border border-gray-300 px-3 space-x-2">
            <div className="text-gray-500 w-4 h-4">
              <FaSearch size={18} />
            </div>
            <input
              type="text"
              placeholder="Search something here"
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="flex items-center justify-center">
              <Link href="/categories">
                <div className="text-gray-500 w-8 h-8">
                  <PiSlidersHorizontal size={28} />
                </div>
              </Link>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
        <Link href="/favorites">
          <FaHeart size={24} className="text-gray-500 cursor-pointer" />
          </Link>
          <Link href="/cart">
          <BsCartCheckFill size={24} className="text-gray-500 cursor-pointer" />
          </Link>
          <Link href="/">
          <FiSettings size={24} className="text-gray-500 cursor-pointer" />
          </Link>
          <SignedOut >
          <SignInButton mode="modal" forceRedirectUrl='/'/>
          </SignedOut>
          <SignedIn >
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div className="md:hidden px-5 py-2">
        <div className="flex items-center w-full h-[44px] bg-gray-100 rounded-full border border-gray-300 px-3 space-x-2">
          <div className="text-gray-500 w-4 h-4">
            <FaSearch size={18} />
          </div>
          <input
            type="text"
            placeholder="Search something here"
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="flex items-center justify-center">
            <Link href="/categories">
              <div className="text-gray-500 w-8 h-8">
                <PiSlidersHorizontal size={28} />
              </div>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
