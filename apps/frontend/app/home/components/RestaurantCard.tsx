import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import React from 'react';

export type Restaurant = {
  name: string;
  cuisines: string[];
  locality: string;
  imageUrl: string;
  rating: number;
}

// Normal Restaurant Listing
export default function RestaurantListing({ restaurant }: { restaurant: Restaurant }) {
  const { name, cuisines, locality, imageUrl, rating } = restaurant;

  return (
    <>
      <div className='overlay-container'>
        <img
          src={imageUrl}
          alt='restaurant'
          className='relative w-full min-h-[180px] overflow-hidden aspect-video object-cover block rounded-md'
        />
      </div>

      <h2 className='text-lg font-semibold mt-2 text-zinc-800'>{name}</h2>
      <div className='flex items-center gap-2'>
        <StarIcon className='w-6 h-6 text-orange-400' />
        <p className='font-semibold text-gray-700 text-sm'>{rating}</p>
      </div>

      <p className='truncate text-zinc-600'>
        {cuisines?.map((cuisine, index) => (
          <span key={index}>
            {cuisine}
            {index === cuisines.length - 1 ? '' : ', '}
          </span>
        ))}
      </p>

      <p className='text-zinc-600'>{locality}</p>
    </>
  );
}

// HOC for Top Rated Restaurants
export const withTopRatedLabel = (RestaurantCard: React.ComponentType<{ restaurant: Restaurant }>) => {
  return (props: { restaurant: Restaurant }) => {
    return (
      <div className='relative'>
        <p className='absolute z-10 -top-2 -left-2 rounded-md p-2 px-4 bg-zinc-900 text-white text-xs'>
          Top Rated
        </p>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
