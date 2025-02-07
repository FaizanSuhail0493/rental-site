'use client';

import { IoSwapVerticalOutline } from 'react-icons/io5';

interface FiltersProps {
  filters: {
    pickUpDate?: string;
    dropOffDate?: string;
    pickUpCity?: string;
    dropOffCity?: string;
    pickUpTime?: string;
    dropOffTime?: string;
  };
  onFilterChange: (updatedFilters: Partial<FiltersProps['filters']>) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters = {}, onFilterChange }) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-8 items-center">
      {/* Pick-Up Section */}
      <div className="w-[295px] sm:h-[88px] md:w-[582px] md:h-[132px] p-2 md:p-5 bg-white md:mt-4 mt-2 rounded-md">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="pickup"
            name="type"
            defaultChecked
            className="mr-2"
          />
          <label htmlFor="pickup" className="font-semibold">
            Pick-Up
          </label>
        </div>

        {/* Pick-Up Location */}
        <div className='grid grid-cols-1 sm:grid-cols-3 md:gap-4'>
          <div className='flex flex-col w-full'>
        <label className="block font-bold mb-2">Locations</label>
        <select
          value={filters.pickUpCity || ''}
          onChange={(e) => onFilterChange({ ...filters, pickUpCity: e.target.value })}
          className="block w-full p-2 border rounded-md mb-4"
        >
          <option value="">Select your city</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        </div>
       

        {/* Pick-Up Date */}
        <div className='flex flex-col w-full'>
        <label className="block font-bold mb-2">Date</label>
        <input
          type="date"
          value={filters.pickUpDate || ''}
          onChange={(e) => onFilterChange({ ...filters, pickUpDate: e.target.value })}
          className="block w-full p-2 border rounded-md mb-4"
        />
        </div>

        {/* Pick-Up Time */}
        <div className='flex flex-col w-full'>
        <label className="block font-bold mb-2">Time</label>
        <input
          type="time"
          value={filters.pickUpTime || ''}
          onChange={(e) => onFilterChange({ ...filters, pickUpTime: e.target.value })}
          className="block w-full p-2 border rounded-md"
        />
        </div>
      </div>
      </div>

      {/* Swap Button */}
      <div className="flex items-center justify-center bg-blue-500 p-4 rounded-full shadow-md">
        <IoSwapVerticalOutline size={24} color="white" />
      </div>

      {/* Drop-Off Section */}
      <div className="w-[295px] sm:h-[88px] md:w-[582px] md:h-[132px] p-2 md:p-5 bg-white md:mt-4 mt-2 rounded-md">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="dropoff"
            name="type"
            defaultChecked
            className="mr-2"
          />
          <label htmlFor="pickup" className="font-semibold">
            Drop-Off
          </label>
        </div>

        {/* Drop Off Location */}
      <div className='grid grid-cols-1 sm:grid-cols-3 md:gap-4'>
        <div className='flex flex-col w-full'>
          <label className="block font-bold mb-2">Locations</label>
          <select
            value={filters.dropOffCity || ''}
            onChange={(e) => onFilterChange({ ...filters, dropOffCity: e.target.value })}
            className="block w-full p-2 border rounded-md mb-4"
          >
            <option value="">Select your city</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Drop Off Date */}
        <div className='flex flex-col w-full'>
          <label className="block font-bold mb-2">Date</label>
          <input
           type="date"
           value={filters.dropOffDate || ''}
           onChange={(e) => onFilterChange({ ...filters, dropOffDate: e.target.value })}
           className="block w-full p-2 border rounded-md mb-4"
          />
        </div>

        {/* Drop Off Time */}
        <div className='flex flex-col w-full'>
          <label className="block font-bold mb-2">Time</label>
          <input
            type="time"
            value={filters.dropOffTime || ''}
            onChange={(e) => onFilterChange({ ...filters, dropOffTime: e.target.value })}
            className="block w-full p-2 border rounded-md"
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Filters;
