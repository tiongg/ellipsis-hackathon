import { FormEvent, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { GetListingDto } from '@shared-types/features/listing/get-listing.dto';
import _ from 'lodash';
import Link from 'next/link';
import useSWR from 'swr';

import RestaurantListing, {
  Restaurant,
  withTopRatedLabel,
} from './RestaurantCard';

const imageUrls = [
  //Macs
  'https://images.inc.com/uploaded_files/image/1920x1080/getty_84709618_387335.jpg',
  //Burger King
  'https://imageio.forbes.com/specials-images/dam/imageserve/1058912512/960x0.jpg?height=474&width=711&fit=bounds',
  //KFC
  'https://t3.ftcdn.net/jpg/05/41/62/96/360_F_541629636_RlfZtQI6uIOW9Uj52x6HpczOlFNVps4L.jpg',
  //Subway
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxNlMn5pRr_C1FdqJLfkXNgw08vcxZTidLw&s',
];
const RestaurantCardTopRated = withTopRatedLabel(RestaurantListing);

export default function ListingsNearYou() {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const searchRef = useRef(null);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { data: listings, isLoading: isLoadingListings } =
    useSWR<GetListingDto>('/api/listing');

  if (isLoadingListings) {
    return <p>Loading...</p>;
  }

  //Group products together and count
  //TODO: why is this not done on the be???
  const groupedListings = _.groupBy(
    listings ?? [],
    (listing) => listing.product.store.storeId
  );
  const stores = Object.entries(groupedListings).reduce<
    Record<string, Restaurant>
  >((acc, [storeId, productListing]) => {
    const { storeName } = productListing[0].product.store;
    acc[storeId] = {
      name: storeName,
      rating: Math.floor(Math.random() * 10) / 10 + 4,
      cuisines: ['Fast Food', 'Burgers'],
      locality: 'Singapore',
      imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
    };
    return acc;
  }, {});

  return (
    <div className="container">
      <h1 className="my-4 mt-8 font-bold text-2xl text-zinc-700">
        Restaurants near you
      </h1>
      <form
        onSubmit={handleSearch}
        className="flex gap-2 md:gap-4 max-w-[560px] w-[90%] mx-auto mt-6"
      >
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for Mcdonald"
          className="p-2 px-4 rounded-md border outline-none focus-within:border-primary border-gray-200 grow w-full"
          ref={searchRef}
        />
        <button
          type="submit"
          className="bg-primary basis-2/12 text-center text-white p-2 flex justify-center gap-2 items-center md:px-8 rounded-md text-sm md:text-base"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />{' '}
          <span className="hidden md:block">Search</span>
        </button>
      </form>

      <br />
      <br />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {Object.entries(stores).map(([storeId, store]) => (
          <Link
            href={`/store/${storeId}`}
            className="hover:scale-95 transition ease-in-out duration-300 relative z-10"
            key={storeId}
          >
            <RestaurantCardTopRated key={storeId} restaurant={store} />
          </Link>
        ))}
      </div>
    </div>
  );
}
