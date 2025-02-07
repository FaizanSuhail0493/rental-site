
import ReviewSection from '@/app/components/ReviewSection';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const ProductDetails = async ({ params: { id } }: { params: { id: string } }) => {
  const query = `*[_type == "car" && _id == $id]{
    name,
    pricePerDay,
    type,
    fuelCapacity,
    transmission,
    seatingCapacity,
    "id": _id,
    "imageUrl": image.asset->url
  }[0]`;

  const product: Card | null = await client.fetch(query, { id });

  if (!product) {
    return (
      <div>
        <h1>Product not Found</h1>
      </div>
    );
  }

  return (
    <div key={product.id} className="flex flex-col justify-center  bg-gray-200">
      {/* Product Details */}
      <div className="w-full flex flex-col md:flex-row justify-center gap-4">
        <div className="flex">
          <div className="">
            {/* Car Image Section */}
            <div className="bg-blue-500 ml-4 rounded-lg text-white p-6 overflow-hidden w-[327px] h-[232px] md:w-[492px] md:h-[360px] pl-5 md:mt-4">
              <h2 className="text-[18px] md:text-[24px] font-boldmd:mb-2">
                {product.name} car with the <br /> best design and acceleration
              </h2>
              <p className="text-[12px] md:text-[18px] md:mt-3">
                Safety and comfort while driving a <br />
                futuristic and elegant sports car
              </p>
              <Image
                src={product.imageUrl}
                alt="Luxury Car"
                width={460}
                height={140}
                className="sm:mt-4"
              />
            </div>

            {/* Additional Images */}
            <div className="flex flex-row gap-6 ml-4">
              <div className="bg-blue-500 rounded-lg text-white md:w-[148px] md:h-[124px] mt-4">
                <Image
                  src={product.imageUrl}
                  alt="Luxury Car"
                  width={140}
                  height={36}
                  className="pt-7 md:pt-10 md:ml-1"
                />
              </div>
              <div>
                <Image
                  src="/view 2.png"
                  alt="Luxury Car"
                  width={148}
                  height={124}
                  className="pt-4"
                />
              </div>
              <div>
                <Image
                  src="/view 3.png"
                  alt="Luxury Car"
                  width={148}
                  height={124}
                  className="pt-4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-[327px] h-[318px] md:w-[492px] md:h-[508px] ml-4 p-2 bg-white mt-4 rounded-md md:p-4">
          <h2 className="text-xl md:text-3xl font-bold">{product.name}</h2>
          <div className="text-[12px] md:mt-4 flex items-center gap-3">
            <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
            <p className="text-gray-600 text-[10px] md:text-[14px]">440+ Reviewer</p>
          </div>
          <div className="mt-4 md:mt-6">
            <p className="text-gray-600 text-[14px] md:text-[20px] mt-2 leading-7 md:leading-9">
              {product.name} has become the embodiment of {product.type} outstanding
              performance, inspired by the most unforgiving proving ground, the
              race track.
            </p>
          </div>
          <div className="grid grid-cols-4 md:mt-8 sm:text-[12px] md:text-[20px] space-y-4">
            <h2 className="mt-4 text-gray-400">Type Car</h2>
            <h2>{product.type}</h2>
            <h2 className="text-gray-400">Capacity</h2>
            <h2>{product.seatingCapacity}</h2>
            <h2 className="text-gray-400">Steering</h2>
            <h2>{product.transmission}</h2>
            <h2 className="text-gray-400">Gasoline</h2>
            <h2>{product.fuelCapacity}</h2>
          </div>
          <div className="mt-2 md:mt-14 flex justify-between items-center">
            <div className="flex flex-row gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600">{product.pricePerDay}/day</h2>
            </div>
            <Link href="/">
              <button className="bg-blue-500 text-white px-2 md:px-4 md:py-2 rounded-md mr-8">Back to Products</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="w-[327px] md:w-[1000px]  rounded-lg bg-white mt-4 p-4 mx-auto mb-4">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <ReviewSection />
      </div>
    </div>
  );
};


export default ProductDetails;
