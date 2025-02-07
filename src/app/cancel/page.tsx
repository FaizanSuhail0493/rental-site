import Link from 'next/link';
import { RxCrossCircled } from "react-icons/rx";

const CancelPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center w-80">
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 p-4 rounded-full animate-pulse">
            <RxCrossCircled size={40} className="text-white" />
          </div>
        </div>
        <h2 className="text-red-600 text-2xl font-bold">Ooops!</h2>
        <p className="text-gray-600 mt-2">Payment was Cancelled</p>
        <Link href="/cart">
        <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">
          Back to Cart
        </button>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;