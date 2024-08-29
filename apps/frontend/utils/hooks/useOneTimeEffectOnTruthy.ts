import { DependencyList, EffectCallback, useCallback, useEffect, useRef } from 'react';
/**
 * A useEffect wrapper that only triggers once when all the declared dependancies are truthy
 * @param  {EffectCallback} effect - Imperative function that can return a cleanup function
 * @param  {DependencyList} deps - Effect will only activate if the values in the list change.
 */
const useOneTimeEffectOnTruthy = (effect: EffectCallback, deps: DependencyList) => {
  const fetched = useRef<boolean>(false); // used to ensure fetch only occurs once

  // Hook ensures that the callback function is updated when its deps are updated
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callbackHook = useCallback(effect, deps);

  return useEffect(() => {
    if (fetched.current || deps?.some((dep) => !dep)) return;
    fetched.current = true;
    return callbackHook();
  }, [callbackHook, fetched, deps]);
};

export default useOneTimeEffectOnTruthy;
