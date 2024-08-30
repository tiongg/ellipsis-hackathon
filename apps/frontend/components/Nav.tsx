'use client';

import { useState } from 'react';
import {
  Bars3Icon,
  BuildingOfficeIcon,
  HomeIcon,
  PhoneIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { selectItemsInCart } from '../app/store/features/cartSlice';
import { useAuth } from '../providers/AuthProviders';
import Logo from './Logo';

export default function Navbar() {
  const { self, signOut } = useAuth();
  const cartItems = useSelector(selectItemsInCart);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [items, setItems] = useState(cartItems ?? []); // Assuming this will be managed elsewhere in your app

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
              <BuildingOfficeIcon className="w-4 h-4 text-gray-700" />{' '}
              <p className="hidden md:block">About</p>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <PhoneIcon className="w-4 h-4 text-gray-700" />{' '}
              <p className="hidden md:block">Contact</p>
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="p-2 relative md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <ShoppingBagIcon className="w-4 h-4 text-gray-700" />{' '}
              <p className="hidden md:block">Cart</p>
              {items.length > 0 && (
                <p className="absolute -top-1 -right-1 bg-primary text-white flex justify-center items-center w-5 h-5 text-xs rounded-full">
                  {items.length}
                </p>
              )}
            </Link>
          </li>
        </ul>

        <button className="block md:hidden" onClick={handleToggleMenu}>
          <Bars3Icon className="w-6 h-6" />
        </button>

        {!self ? (
          <button
            onClick={() => router.push('/auth/login')}
            className="ml-4 bg-primary text-white p-2 px-4 rounded-md items-center gap-2"
          >
            Login
          </button>
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
                  href="/about"
                  className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
                >
                  <BuildingOfficeIcon className="w-4 h-4 text-gray-700" />{' '}
                  <p>About</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
                >
                  <PhoneIcon className="w-4 h-4 text-gray-700" /> <p>Contact</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="p-2 relative md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
                >
                  <ShoppingBagIcon className="w-4 h-4 text-gray-700" />{' '}
                  <p>Cart</p>
                  {items.length > 0 && (
                    <p className="absolute -top-1 -right-1 bg-primary text-white flex justify-center items-center w-5 h-5 text-xs rounded-full">
                      {items.length}
                    </p>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
