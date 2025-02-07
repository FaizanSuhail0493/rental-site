import Link from 'next/link';
import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';

const SuccessPage = () => {
  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
         <div className="bg-white rounded-2xl shadow-lg p-6 text-center w-80">
           <div className="flex justify-center mb-4">
             <div className="bg-green-500 p-4 rounded-full animate-pulse">
               <BsCheckCircle size={40} className="text-white" />
             </div>
           </div>
           <h2 className="text-green-600 text-2xl font-bold">Yeah!</h2>
           <p className="text-gray-600 mt-2">Payment Successful.</p>
           <Link href="/">
           <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
             Done
           </button>
           </Link>
         </div>
         </div>
      
  );
};

export default SuccessPage;