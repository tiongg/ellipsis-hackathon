import { useMemo } from 'react';

export default function useQueryParamAsString(rawString: string | string[] | undefined) {
  return useMemo(() => {
    if (typeof rawString !== 'string') return;
    return rawString as string;
  }, [rawString]);
}
