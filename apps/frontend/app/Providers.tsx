'use client';

import { PropsWithChildren } from 'react';
import axios from 'axios';
import { SWRConfig } from 'swr';

import CartInitalizer from '@frontend/providers/CartInitalizer';
import Footer from '../components/Footer';
import Navbar from '../components/Nav';
import AuthProvider from '../providers/AuthProviders';
import ReduxProvider from '../providers/ReduxProvider';
import { fetcher } from '../utils/fetcher';
import { getToken } from '../utils/token';

export default function Providers({ children }: PropsWithChildren) {
  // Add bearer token to all requests
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) config.headers['Authorization'] = `bearer ${token}`;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <ReduxProvider>
        <AuthProvider>
          <CartInitalizer>
            {/* Might not make sense being in providers, but idc */}
            <Navbar />
            {children}
            <Footer />
          </CartInitalizer>
        </AuthProvider>
      </ReduxProvider>
    </SWRConfig>
  );
}
