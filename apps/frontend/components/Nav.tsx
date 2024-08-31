'use client';

import { useState } from 'react';
import {
  Bars3Icon,
  BuildingOfficeIcon,
  HomeIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { selectItemsInCart } from '@frontend/utils/cart-slice';
import { useAppSelector } from '@frontend/utils/redux-selectors';
import { useAuth } from '../providers/AuthProviders';
import { Badge } from './Badge';
import Logo from './Logo';

export default function Navbar() {
  const { self, signOut } = useAuth();
  const items = useAppSelector(selectItemsInCart);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky w-full text-lg top-0 bg-white z-20 py-4 border-b shadow-sm border-gray-100">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Add your Logo component here */}
          <Logo />
        </div>

        <ul className="text-zinc-700 ml-auto gap-2 md:gap-4 items-center hidden md:flex">
          <li>
            <Link
              href="/home"
              className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4 text-gray-700" />{' '}
              <p className="hidden md:block">Home</p>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <BuildingOfficeIcon className="w-4 h-4 text-gray-700" />
              <p>About</p>
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="p-2 relative md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <ShoppingBagIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">Cart</p>
              <Badge count={items.length} />
            </Link>
          </li>
        </ul>

        <button className="block md:hidden" onClick={handleToggleMenu}>
          <Bars3Icon className="w-6 h-6" />
        </button>

        {!self ? (
          <Link href="/auth/login">
            <button
              onClick={() => router.push('/auth/login')}
              className="ml-4 bg-primary text-white p-2 px-4 rounded-md items-center gap-2"
            >
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={signOut}
            className="ml-4 bg-primary text-white p-2 px-4 rounded-md items-center gap-2"
          >
            Logout
          </button>
        )}

        {isMenuOpen && (
          <div className="shadow-lg transition-all fixed top-full right-0 bg-white h-screen p-4 px-8 md:hidden">
            <ul className="text-zinc-700 space-y-4">
              <li>
                <Link
                  href="Home"
                  className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
                >
                  <HomeIcon className="w-4 h-4 text-gray-700" /> <p>Home</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/storefront"
                  className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
                >
                  <BuildingOfficeIcon className="w-4 h-4 text-gray-700" />
                  <p>Store</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="p-2 relative md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
                >
                  <ShoppingBagIcon className="w-4 h-4 text-gray-700" />{' '}
                  <p>Cart</p>
                  <Badge count={items.length} />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
