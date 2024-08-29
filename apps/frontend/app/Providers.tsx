'use client';

import axios from 'axios';
import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';
import AuthProvider from '../providers/AuthProviders';
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
      <AuthProvider>{children}</AuthProvider>
    </SWRConfig>
  );
}
