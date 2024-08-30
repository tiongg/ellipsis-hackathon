import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { SelfDto } from '@shared-types/features/auth/self-dto.dto';
import useSWR from 'swr';

import { getToken, removeToken } from '../utils/token';

export type AuthContext = Partial<{
  self: SelfDto;
  signOut: () => void;
  fetchSelf: () => Promise<SelfDto | undefined>;
  isLoading: boolean;
}>;

export const authContext = createContext<AuthContext>({});

export default function AuthProvider({ children }: PropsWithChildren) {
  const { data, mutate, error, isLoading } = useSWR<SelfDto>(`/api/auth/self`);

  const fetchSelf = useCallback(async () => {
    const token = getToken();
    if (!token) return undefined;
    return await mutate();
  }, [mutate]);

  const self = useMemo(() => {
    if (error) return;
    if (data) return data;
    fetchSelf();
  }, [data, error, fetchSelf]);

  const signOut = () => {
    removeToken();
    //easy way to reset state
    window.location.href = '/auth/login';
  };

  return (
    <authContext.Provider value={{ self, signOut, fetchSelf, isLoading }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
