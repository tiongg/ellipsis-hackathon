import {
  DisplayListingDto,
  GetListingDto,
} from '@shared-types/features/listing/get-listing.dto';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';

import { Card } from '@components/card';
import RestaurantListing, { withTopRatedLabel} from './RestaurantCard';

/**
 * Single listing item containing details + quantity
 *
 * Assumes every product in the array is the same!
 */
function IndividualListing({
  productListing,
}: {
  productListing: DisplayListingDto[];
}) {
  const product = productListing[0].product;
  const quantity = productListing.length;
  const router = useRouter();

  return (
    <Card
      className="w-[350px] cursor-pointer"
      onClick={() => {
        router.push(`/store/${product.store.storeId}`);
      }}
    >
      <img src={product.productImageUrl} alt={product.productName} />
      <p>{product.productName}</p>
      <p>Quantity: {quantity}x</p>
      <p>From: {product.store.storeName}</p>
    </Card>
  );
}

const restaurants = [
  {
    name: 'McDonalds',
    rating: 4.5,
    cuisines: ['Fast Food', 'Burgers'],
    locality: 'Singapore',
    imageUrl:
      'https://images.inc.com/uploaded_files/image/1920x1080/getty_84709618_387335.jpg',
  },
  {
    name: 'Burger King',
    rating: 4.3,
    cuisines: ['Fast Food', 'Burgers'],
    locality: 'Singapore',
    imageUrl:
      'https://imageio.forbes.com/specials-images/dam/imageserve/1058912512/960x0.jpg?height=474&width=711&fit=bounds',
  },
  {
    name: 'KFC',
    rating: 4.1,
    cuisines: ['Fast Food', 'Burgers'],
    locality: 'Singapore',
    imageUrl:
      'https://t3.ftcdn.net/jpg/05/41/62/96/360_F_541629636_RlfZtQI6uIOW9Uj52x6HpczOlFNVps4L.jpg'
  },
  {
    name: 'Subway',
    rating: 4.0,
    cuisines: ['Fast Food', 'Burgers'],
    locality: 'Singapore',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxNlMn5pRr_C1FdqJLfkXNgw08vcxZTidLw&s',
  },
  {
    name: 'McDonalds',
    rating: 4.5,
    cuisines: ['Fast Food', 'Burgers'],
    locality: 'Singapore',
    imageUrl:
      'https://images.inc.com/uploaded_files/image/1920x1080/getty_84709618_387335.jpg',
  },
  {
    name: 'Burger King',
    rating: 4.3,
    cuisines: ['Fast Food', 'Burgers'],
    locality: 'Singapore',
    imageUrl:
      'https://imageio.forbes.com/specials-images/dam/imageserve/1058912512/960x0.jpg?height=474&width=711&fit=bounds',
  },
  {
    name: 'KFC',
    rating: 4.1,
    cuisines: ['Fast Food', 'Burgers'],
    locality: 'Singapore',
    imageUrl:
      'https://t3.ftcdn.net/jpg/05/41/62/96/360_F_541629636_RlfZtQI6uIOW9Uj52x6HpczOlFNVps4L.jpg'
  },
  {
    name: 'Subway',
    rating: 4.0,
    cuisines: ['Fast Food', 'Burgers'],
    locality: 'Singapore',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxNlMn5pRr_C1FdqJLfkXNgw08vcxZTidLw&s',
  },
];

export default function ListingsNearYou() {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const serachRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
  };
  const { data: listings, isLoading: isLoadingListings } =
    useSWR<GetListingDto>('/api/listing');

  if (isLoadingListings) {
    return <p>Loading...</p>;
  }

  //Group products together and count
  //TODO: why is this not done on the be???
  const groupedListings = _.groupBy(listings, (listing) => listing.productId);

  const RestaurantCardTopRated = withTopRatedLabel(RestaurantListing);

  return (
    //  /* <p>Current listings:</p>
    // {Object.entries(groupedListings).map(([productId, productListing]) => (
    //   <IndividualListing key={productId} productListing={productListing} />
    // ))} */
    <div className="container">
      <h1 className="my-4 mt-8 font-bold text-2xl text-zinc-700">
        Restaurants near you
      </h1>
      <form
        onSubmit={handleSearch}
        className='flex gap-2 md:gap-4 max-w-[560px] w-[90%] mx-auto mt-6'
      >
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search for Mcdonald'
          className='p-2 px-4 rounded-md border outline-none focus-within:border-blue-500 border-gray-200 grow w-full'
          ref={serachRef}
        />
        <button
          type='submit'
          className='bg-blue-500 basis-2/12 text-center text-white p-2 flex justify-center gap-2 items-center md:px-8 rounded-md text-sm md:text-base'
        >
          <MagnifyingGlassIcon className='w-4 h-4' />{' '}
          <span className='hidden md:block'>Search</span>
        </button>
      </form>

      <br/>
      <br/>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {restaurants.map((restaurant, i) => (
          <RestaurantCardTopRated key={i} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
